import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/sanity';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    
    const blogPosts = await getBlogPosts(limit);
    
    return NextResponse.json({ blogPosts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 