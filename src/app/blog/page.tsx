import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/sanity';

// This would be replaced with actual data fetching from Sanity
async function getBlogs() {
  try {
    // In a real implementation, this would fetch from Sanity
    const blogs = await getBlogPosts(12);
    
    // For now, return mock data if Sanity fetch fails
    if (!blogs || blogs.length === 0) {
      return [
        {
          _id: '1',
          title: 'Building a Modern Blog with Next.js and Sanity',
          slug: 'building-modern-blog-nextjs-sanity',
          publishedAt: '2023-03-10',
          excerpt: 'Learn how to combine Next.js and Sanity to create a powerful, flexible blog platform.',
          mainImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          author: {
            name: 'Jane Smith',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
          categoryName: 'Development',
          categorySlug: 'development',
        },
        {
          _id: '2',
          title: 'Responsive Design Principles for Modern Websites',
          slug: 'responsive-design-principles',
          publishedAt: '2023-03-05',
          excerpt: 'Explore key principles for creating websites that work flawlessly across all devices and screen sizes.',
          mainImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          author: {
            name: 'Alex Johnson',
            image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
          categoryName: 'Design',
          categorySlug: 'design',
        },
        {
          _id: '3',
          title: 'Performance Optimization Techniques for Next.js',
          slug: 'performance-optimization-nextjs',
          publishedAt: '2023-02-28',
          excerpt: 'Discover advanced techniques to make your Next.js applications lightning fast.',
          mainImage: 'https://images.unsplash.com/photo-1596778402543-bcd2e4aadfe8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          author: {
            name: 'Michael Chen',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
          categoryName: 'Performance',
          categorySlug: 'performance',
        },
        {
          _id: '4',
          title: 'Creating a Custom CMS Dashboard with Sanity',
          slug: 'custom-cms-dashboard-sanity',
          publishedAt: '2023-02-20',
          excerpt: 'Learn how to customize the Sanity Studio interface to create a tailored content management experience.',
          mainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          author: {
            name: 'Sarah Williams',
            image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
          categoryName: 'CMS',
          categorySlug: 'cms',
        },
      ];
    }
    
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Blog
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-400 sm:mt-5">
            Insights, tutorials, and perspectives on web development and design.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog._id} className="flex flex-col bg-gray-900 rounded-lg overflow-hidden h-full hover:ring-2 hover:ring-white transition-all">
              <Link href={`/blog/${blog.slug}`} className="block h-full">
                <div className="relative h-48">
                  <Image
                    src={blog.mainImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300">
                      {blog.categoryName}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white">{blog.title}</h2>
                  <p className="text-gray-400 mb-4 flex-grow">{blog.excerpt}</p>
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-800">
                    <div className="flex-shrink-0">
                      <Image
                        src={blog.author.image}
                        alt={blog.author.name}
                        className="h-8 w-8 rounded-full"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{blog.author.name}</p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={blog.publishedAt}>
                          {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 