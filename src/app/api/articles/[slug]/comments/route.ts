import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getArticleBySlug } from '@/lib/sanity';

// Get comments for an article
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
    
    // Get comments for the article from PostgreSQL
    const comments = await prisma.comment.findMany({
      where: { articleId: article._id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// Add a new comment to an article
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
    const { userId, text } = await request.json();
    
    if (!userId || !text) {
      return NextResponse.json(
        { error: 'User ID and text are required' },
        { status: 400 }
      );
    }
    
    try {
      // Create a new comment
      const comment = await prisma.comment.create({
        data: {
          text,
          userId,
          articleId: article._id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
      
      // Update article metadata
      const metadata = await prisma.articleMetadata.findUnique({
        where: { id: article._id },
      });
      
      if (metadata) {
        await prisma.articleMetadata.update({
          where: { id: article._id },
          data: { commentsCount: metadata.commentsCount + 1 },
        });
      } else {
        // Create metadata if it doesn't exist
        await prisma.articleMetadata.create({
          data: {
            id: article._id,
            viewCount: 1,
            likesCount: 0,
            commentsCount: 1,
          },
        });
      }
      
      return NextResponse.json({ 
        message: 'Comment added successfully',
        comment 
      }, { status: 201 });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to add comment' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
} 