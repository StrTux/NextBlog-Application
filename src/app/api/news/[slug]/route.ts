import { NextResponse } from 'next/server';
import { getNewsPostBySlug } from '@/lib/sanity';

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
    
    const newsPost = await getNewsPostBySlug(slug);
    
    if (!newsPost) {
      return NextResponse.json(
        { error: 'News post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ newsPost }, { status: 200 });
  } catch (error) {
    console.error('Error fetching news post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news post' },
      { status: 500 }
    );
  }
} 