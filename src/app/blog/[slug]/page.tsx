import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug } from '@/lib/sanity';

// This would be replaced with actual data fetching from Sanity
async function getBlogPost(slug: string) {
  try {
    // In a real implementation, this would fetch from Sanity
    const post = await getBlogPostBySlug(slug);
    
    // For now, return mock data if Sanity fetch fails
    if (!post) {
      return {
        title: 'Building a Modern Blog with Next.js and Sanity',
        slug: 'building-modern-blog-nextjs-sanity',
        author: {
          name: 'Jane Smith',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          bio: 'Frontend Developer passionate about modern web technologies'
        },
        publishedAt: '2023-03-10',
        category: { title: 'Development', slug: 'development' },
        mainImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        tags: ['Next.js', 'Sanity', 'React', 'Web Development'],
        content: [
          {
            type: 'paragraph',
            text: 'Creating a blog with Next.js and Sanity offers a powerful combination of frontend flexibility and backend content management. In this blog post, we\'ll explore how to set up this stack and create a modern, performant blog.'
          },
          {
            type: 'heading',
            text: 'Why Next.js for Blogs?'
          },
          {
            type: 'paragraph',
            text: 'Next.js provides excellent performance optimizations for blogs through static generation, image optimization, and incremental static regeneration. These features ensure your blog loads quickly and ranks well in search engines.'
          },
          {
            type: 'paragraph',
            text: 'With the App Router introduced in Next.js 13, building complex blog layouts with nested components has become more intuitive and powerful.'
          },
          {
            type: 'heading',
            text: 'Sanity as a Content Backend'
          },
          {
            type: 'paragraph',
            text: 'Sanity offers a customizable content studio that makes creating and editing blog posts a breeze. Its structured content approach means you can define exactly how your content should be organized and validated.'
          },
          {
            type: 'paragraph',
            text: 'The Sanity GROQ query language allows for precise queries to fetch exactly the content you need, reducing unnecessary data transfer and improving performance.'
          },
          {
            type: 'heading',
            text: 'Setting Up the Project'
          },
          {
            type: 'paragraph',
            text: 'To get started, you\'ll need to create both a Next.js project and a Sanity project. You can then connect them using the Sanity client library to fetch content from your Sanity dataset.'
          },
          {
            type: 'paragraph',
            text: 'The next steps involve defining your content schemas in Sanity and creating the necessary components and pages in Next.js to display your blog posts.'
          }
        ]
      };
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-10">
          <Link href="/blog" className="text-gray-400 hover:text-white">
            ← Back to Blog
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <div className="flex justify-between items-center mb-5">
              <div>
                <Link 
                  href={`/categories/${post.category?.slug || 'development'}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {post.category?.title || 'Development'}
                </Link>
              </div>
              <time className="text-gray-400" dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{post.author.name}</p>
                <p className="text-sm text-gray-400">{post.author.bio}</p>
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="relative aspect-video mb-8">
              <Image
                src={post.mainImage}
                alt={post.title}
                className="rounded-lg object-cover"
                fill
                priority
              />
            </div>

            {post.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return <p key={index} className="mb-6">{block.text}</p>;
              } else if (block.type === 'heading') {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{block.text}</h2>;
              }
              return null;
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800">
            <h3 className="text-lg font-medium mb-4">Share this post</h3>
            <div className="flex space-x-4">
              <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                Twitter
              </button>
              <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                Facebook
              </button>
              <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                LinkedIn
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}