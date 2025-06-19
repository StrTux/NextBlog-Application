import { NextResponse } from 'next/server';
import { getNewsPosts } from '@/lib/sanity';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    
    const newsPosts = await getNewsPosts(limit);
    
    return NextResponse.json({ newsPosts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching news posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news posts' },
      { status: 500 }
    );
  }
} 