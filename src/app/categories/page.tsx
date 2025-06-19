import Link from 'next/link';

export default function Categories() {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Categories
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Browse content by topic.
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300">Coming soon - Categories will be available shortly!</p>
          <Link 
            href="/"
            className="mt-8 inline-flex items-center px-6 py-3 border border-white rounded-md text-base font-medium text-white hover:bg-gray-900"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 