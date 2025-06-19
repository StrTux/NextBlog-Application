import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/lib/sanity';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }
    
    const article = await getArticleBySlug(slug);
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    // Try to get article metadata from PostgreSQL
    try {
      const metadata = await prisma.articleMetadata.findUnique({
        where: { id: article._id },
      });
      
      if (metadata) {
        // Increment view count
        await prisma.articleMetadata.update({
          where: { id: article._id },
          data: { viewCount: metadata.viewCount + 1 },
        });
        
        return NextResponse.json({ 
          article,
          metadata: { 
            viewCount: metadata.viewCount + 1,
            likesCount: metadata.likesCount,
            commentsCount: metadata.commentsCount
          }
        }, { status: 200 });
      } else {
        // Create metadata if it doesn't exist
        await prisma.articleMetadata.create({
          data: {
            id: article._id,
            viewCount: 1,
            likesCount: 0,
            commentsCount: 0,
          },
        });
        
        return NextResponse.json({ 
          article,
          metadata: { 
            viewCount: 1,
            likesCount: 0,
            commentsCount: 0
          }
        }, { status: 200 });
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      // If database error, still return the article without metadata
      return NextResponse.json({ article }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
} 