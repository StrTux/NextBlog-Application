import Link from 'next/link';
import Image from 'next/image';

// This would be replaced with actual data fetching from Sanity
async function getArticles() {
  // In a real implementation, we would fetch from Sanity
  // For now, return mock data
  return [
    {
      _id: '1',
      title: 'Understanding Next.js and Sanity Integration',
      slug: 'understanding-nextjs-and-sanity',
      publishedAt: '2023-03-15',
      excerpt: 'Learn how to integrate Next.js with Sanity CMS for a powerful content management solution.',
      mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      author: {
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      categories: ['Development', 'Next.js'],
    },
    {
      _id: '2',
      title: 'Building a Blog with Next.js App Router',
      slug: 'building-blog-nextjs-app-router',
      publishedAt: '2023-03-10',
      excerpt: 'Explore the new App Router in Next.js 13+ and learn how to build a modern blog.',
      mainImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      author: {
        name: 'Jane Smith',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      categories: ['Development', 'Next.js', 'React'],
    },
    {
      _id: '3',
      title: 'Optimizing Images in Next.js with next/image',
      slug: 'optimizing-images-nextjs',
      publishedAt: '2023-03-05',
      excerpt: 'Learn how to use the next/image component to optimize images in your Next.js application.',
      mainImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      author: {
        name: 'Bob Johnson',
        image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      categories: ['Development', 'Next.js', 'Performance'],
    },
    {
      _id: '4',
      title: 'Serverless Functions with Next.js API Routes',
      slug: 'serverless-functions-nextjs-api-routes',
      publishedAt: '2023-02-28',
      excerpt: 'Discover how to create serverless functions using Next.js API routes to handle backend logic.',
      mainImage: 'https://images.unsplash.com/photo-1543877087-ebf71fde2be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      author: {
        name: 'Alice Williams',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      categories: ['Development', 'Next.js', 'Backend'],
    },
  ];
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Articles
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-400 sm:mt-5">
            Discover insightful articles about web development, design, and technology.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article._id} className="flex flex-col bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-white transition-all">
              <Link href={`/articles/${article.slug}`} className="block">
                <div className="relative h-48">
                  <Image
                    src={article.mainImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center space-x-1 mb-2">
                    {article.categories.slice(0, 2).map((category) => (
                      <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300">
                        {category}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white">{article.title}</h2>
                  <p className="text-gray-400 mb-4">{article.excerpt}</p>
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-800">
                    <div className="flex-shrink-0">
                      <Image
                        src={article.author.image}
                        alt={article.author.name}
                        className="h-8 w-8 rounded-full"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{article.author.name}</p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={article.publishedAt}>
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
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