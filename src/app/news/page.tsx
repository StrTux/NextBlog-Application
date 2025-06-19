import Link from 'next/link';
import Image from 'next/image';
import { getNewsPosts } from '@/lib/sanity';

// This would be replaced with actual data fetching from Sanity
async function getNews() {
  try {
    // In a real implementation, this would fetch from Sanity
    const news = await getNewsPosts(12);
    
    // For now, return mock data if Sanity fetch fails
    if (!news || news.length === 0) {
      return [
        {
          _id: '1',
          title: 'Next.js 14 Announced with Major Performance Improvements',
          slug: 'nextjs-14-announced',
          publishedAt: '2023-03-15',
          excerpt: 'The Next.js team has announced version 14 of the popular React framework with significant performance enhancements.',
          mainImage: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          authors: [
            {
              name: 'Tech News Team',
              image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }
          ],
          categoryName: 'Technology',
          categorySlug: 'technology',
          featured: true,
        },
        {
          _id: '2',
          title: 'React Server Components Now in Stable Release',
          slug: 'react-server-components-stable',
          publishedAt: '2023-03-12',
          excerpt: 'After years of development, React Server Components have reached a stable release status, changing how we build React applications.',
          mainImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          authors: [
            {
              name: 'React News',
              image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }
          ],
          categoryName: 'React',
          categorySlug: 'react',
          featured: false,
        },
        {
          _id: '3',
          title: 'PostgreSQL 16 Released with Enhanced Performance',
          slug: 'postgresql-16-released',
          publishedAt: '2023-03-08',
          excerpt: 'The latest version of PostgreSQL brings significant performance improvements and new features for developers.',
          mainImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1536&q=80',
          authors: [
            {
              name: 'Database Insights',
              image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }
          ],
          categoryName: 'Database',
          categorySlug: 'database',
          featured: false,
        },
        {
          _id: '4',
          title: 'Sanity CMS Introduces New Content Editing Experience',
          slug: 'sanity-cms-new-experience',
          publishedAt: '2023-03-05',
          excerpt: 'Sanity.io has announced a major update to their content studio, bringing a more intuitive editing experience.',
          mainImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          authors: [
            {
              name: 'CMS Review',
              image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }
          ],
          categoryName: 'CMS',
          categorySlug: 'cms',
          featured: false,
        },
      ];
    }
    
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

interface Author {
  name: string;
  image: string;
}

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  mainImage: string;
  authors: Author[];
  categoryName: string;
  categorySlug: string;
  featured: boolean;
}

export default async function NewsPage() {
  const news = await getNews();
  const featuredNews = news.find((item: NewsItem) => item.featured) || news[0];
  const regularNews = news.filter((item: NewsItem) => item._id !== featuredNews._id);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            News
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-400 sm:mt-5">
            Stay updated with the latest developments in technology and web development.
          </p>
        </div>

        {/* Featured News */}
        <div className="mt-12">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="sm:flex">
              <div className="sm:w-1/2">
                <div className="relative h-72 sm:h-full">
                  <Image
                    src={featuredNews.mainImage}
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-600 text-white">
                      Featured
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:w-1/2 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300">
                    {featuredNews.categoryName}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    <Link href={`/news/${featuredNews.slug}`} className="hover:underline">
                      {featuredNews.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-gray-400">{featuredNews.excerpt}</p>
                </div>
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {featuredNews.authors.map((author, idx) => (
                        <Image 
                          key={idx}
                          className="h-7 w-7 rounded-full ring-2 ring-black" 
                          src={author.image}
                          alt={author.name}
                          width={28}
                          height={28}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      By {featuredNews.authors.map(a => a.name).join(', ')} • {new Date(featuredNews.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/news/${featuredNews.slug}`}
                      className="text-white font-medium hover:text-gray-300 flex items-center"
                    >
                      Read full story
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regular News Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularNews.map((item: NewsItem) => (
            <article key={item._id} className="flex flex-col bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-white transition-all">
              <Link href={`/news/${item.slug}`} className="block">
                <div className="relative h-48">
                  <Image
                    src={item.mainImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300">
                      {item.categoryName}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white">{item.title}</h2>
                  <p className="text-gray-400 mb-4">{item.excerpt}</p>
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-800">
                    <div className="flex -space-x-2 mr-2">
                      {item.authors.map((author, idx) => (
                        <Image 
                          key={idx}
                          className="h-7 w-7 rounded-full ring-2 ring-black" 
                          src={author.image}
                          alt={author.name}
                          width={28}
                          height={28}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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