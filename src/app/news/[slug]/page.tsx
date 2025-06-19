import Link from 'next/link';
import Image from 'next/image';
import { getNewsPostBySlug } from '@/lib/sanity';

// This would be replaced with actual data fetching from Sanity
async function getNewsPost(slug: string) {
  try {
    // In a real implementation, this would fetch from Sanity
    const post = await getNewsPostBySlug(slug);
    
    // For now, return mock data if Sanity fetch fails
    if (!post) {
      return {
        title: 'Next.js 14 Announced with Major Performance Improvements',
        slug: 'nextjs-14-announced',
        authors: [
          {
            name: 'Tech News Team',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          }
        ],
        publishedAt: '2023-03-15',
        category: { title: 'Technology', slug: 'technology' },
        mainImage: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        tags: ['Next.js', 'React', 'Web Development', 'JavaScript'],
        source: 'Tech Chronicle',
        content: [
          {
            type: 'paragraph',
            text: 'The Next.js team has announced version 14 of the popular React framework, promising significant performance improvements and new features aimed at enhancing developer experience.'
          },
          {
            type: 'heading',
            text: 'Performance Enhancements'
          },
          {
            type: 'paragraph',
            text: 'Next.js 14 introduces a new compilation strategy that results in up to 30% faster build times and smaller JavaScript bundles. The updates leverage advancements in the React compiler and include optimizations specifically for server components.'
          },
          {
            type: 'paragraph',
            text: 'Additionally, the new version includes improvements to image optimization, reducing Largest Contentful Paint (LCP) times by up to 40% in typical applications.'
          },
          {
            type: 'heading',
            text: 'Developer Experience Improvements'
          },
          {
            type: 'paragraph',
            text: 'The release includes a revamped developer experience with enhanced error messages, faster refresh times during development, and better integration with TypeScript.'
          },
          {
            type: 'paragraph',
            text: 'A new debugging experience has been introduced, allowing developers to inspect server component rendering and data fetching in real-time through the browser developer tools.'
          },
          {
            type: 'heading',
            text: 'Deployment Optimization'
          },
          {
            type: 'paragraph',
            text: 'Next.js 14 also comes with improvements to deployment workflows, including better caching strategies, enhanced incremental static regeneration, and more efficient edge runtime execution.'
          },
          {
            type: 'paragraph',
            text: 'These changes result in faster deployment times and reduced costs when hosting on platforms like Vercel, Netlify, or AWS.'
          }
        ]
      };
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching news post:', error);
    throw error;
  }
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await getNewsPost(params.slug);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-10">
          <Link href="/news" className="text-gray-400 hover:text-white">
            ← Back to News
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <div className="flex justify-between items-center mb-5">
              <div>
                <Link 
                  href={`/categories/${post.category?.slug || 'technology'}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {post.category?.title || 'Technology'}
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
            
            {post.source && (
              <p className="mt-2 text-sm text-gray-400">
                Source: {post.source}
              </p>
            )}
            
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-2">
                {post.authors?.map((author, index) => (
                  <div key={index} className="flex-shrink-0 z-10">
                    <Image
                      src={author.image}
                      alt={author.name}
                      className="h-10 w-10 rounded-full ring-2 ring-black"
                      width={40}
                      height={40}
                    />
                  </div>
                ))}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  By {post.authors?.map(author => author.name).join(', ')}
                </p>
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
            <h3 className="text-lg font-medium mb-4">Share this news</h3>
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