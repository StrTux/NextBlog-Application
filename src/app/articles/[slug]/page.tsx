import Link from 'next/link';
import Image from 'next/image';

// This would be replaced with actual data fetching from Sanity
async function getArticle(slug: string) {
  // In a real implementation, we would fetch from Sanity
  // For now, return mock data
  return {
    title: 'Understanding Next.js and Sanity Integration',
    slug: 'understanding-nextjs-and-sanity',
    author: {
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    publishedAt: '2023-03-15',
    categories: ['Development', 'Next.js'],
    mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    content: [
      {
        type: 'paragraph',
        text: 'Next.js is a powerful React framework that enables functionality such as server-side rendering, static site generation, and API routes. When combined with Sanity CMS, you have a robust solution for content management with a flexible and customizable front end.'
      },
      {
        type: 'paragraph',
        text: 'This article explores the integration between Next.js and Sanity, covering setup, configuration, and best practices for building a modern content-driven website.'
      },
      {
        type: 'heading',
        text: 'Getting Started with Next.js'
      },
      {
        type: 'paragraph',
        text: 'Next.js provides an excellent developer experience with features like fast refresh, automatic routing, and built-in CSS support. To start a new Next.js project, you can use the create-next-app command, which sets up everything automatically for you.'
      },
      {
        type: 'paragraph',
        text: 'The latest version of Next.js (13+) introduces the App Router, a new paradigm that makes building complex applications more intuitive with nested layouts, server components, and more efficient data fetching.'
      },
      {
        type: 'heading',
        text: 'Integrating Sanity CMS'
      },
      {
        type: 'paragraph',
        text: 'Sanity is a headless CMS that provides a flexible content studio for editors and a powerful API for developers. The integration with Next.js allows you to fetch content using GROQ (Graph-Relational Object Queries) or traditional REST endpoints.'
      },
      {
        type: 'paragraph',
        text: 'To set up Sanity with Next.js, you need to install the necessary packages, configure your project, and define your content schemas. Once set up, you can use the Sanity client to fetch data in your Next.js pages and components.'
      },
    ]
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-10">
          <Link href="/articles" className="text-gray-400 hover:text-white">
            ← Back to Articles
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <div className="flex justify-between items-center mb-5">
              <div className="flex space-x-4">
                {article.categories.map((category) => (
                  <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300">
                    {category}
                  </span>
                ))}
              </div>
              <time className="text-gray-400" dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  className="h-10 w-10 rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{article.author.name}</p>
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="relative aspect-video mb-8">
              <Image
                src={article.mainImage}
                alt={article.title}
                className="rounded-lg object-cover"
                fill
                priority
              />
            </div>

            {article.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return <p key={index} className="mb-6">{block.text}</p>;
              } else if (block.type === 'heading') {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{block.text}</h2>;
              }
              return null;
            })}
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-800">
            <h3 className="text-lg font-medium mb-4">Share this article</h3>
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