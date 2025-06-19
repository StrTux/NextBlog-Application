import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getArticleBySlug } from '@/lib/sanity';

export async function POST(
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
    
    // In a real application, you would get the user ID from the session/token
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    try {
      // Check if the user already liked the article
      const existingLike = await prisma.like.findFirst({
        where: {
          userId,
          articleId: article._id,
        },
      });
      
      if (existingLike) {
        return NextResponse.json(
          { error: 'User already liked this article' },
          { status: 400 }
        );
      }
      
      // Create a new like
      await prisma.like.create({
        data: {
          userId,
          articleId: article._id,
        },
      });
      
      // Update article metadata
      const metadata = await prisma.articleMetadata.findUnique({
        where: { id: article._id },
      });
      
      if (metadata) {
        await prisma.articleMetadata.update({
          where: { id: article._id },
          data: { likesCount: metadata.likesCount + 1 },
        });
        
        return NextResponse.json({ 
          message: 'Article liked successfully',
          likesCount: metadata.likesCount + 1
        }, { status: 200 });
      } else {
        // Create metadata if it doesn't exist
        await prisma.articleMetadata.create({
          data: {
            id: article._id,
            viewCount: 1,
            likesCount: 1,
            commentsCount: 0,
          },
        });
        
        return NextResponse.json({ 
          message: 'Article liked successfully',
          likesCount: 1
        }, { status: 200 });
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to like article' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error liking article:', error);
    return NextResponse.json(
      { error: 'Failed to like article' },
      { status: 500 }
    );
  }
} 