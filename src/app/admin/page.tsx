'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [projectId, setProjectId] = useState('');
  
  useEffect(() => {
    // Get Sanity project ID from environment variable
    setProjectId(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id');
    
    // In a real app, you would check if the user is authenticated as an admin here
    // For now, we'll just show some options
  }, []);
  
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Admin Dashboard
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Manage your NextBlog content
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Sanity Studio Card */}
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Sanity Studio</h2>
              <p className="text-gray-400 mb-4">
                Create and manage your articles, blogs, news, authors, and categories
              </p>
              <div className="flex space-x-4">
                <a 
                  href={`https://${projectId}.sanity.studio/desk`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200"
                >
                  Open Sanity Studio (External)
                </a>
                <Link
                  href="/studio"
                  className="inline-flex items-center px-4 py-2 border border-white rounded-md shadow-sm text-sm font-medium text-white bg-transparent hover:bg-gray-800"
                >
                  Open Studio (Embedded)
                </Link>
              </div>
            </div>
          </div>

          {/* Site Management Card */}
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Site Management</h2>
              <p className="text-gray-400 mb-4">
                Manage users, comments, and other site settings
              </p>
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/"
              className="p-4 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-medium text-white">View Site</h3>
              <p className="mt-1 text-sm text-gray-400">See your site as visitors do</p>
            </Link>
            <Link
              href="/articles"
              className="p-4 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-medium text-white">Articles</h3>
              <p className="mt-1 text-sm text-gray-400">Manage your articles</p>
            </Link>
            <Link
              href="/blog"
              className="p-4 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-medium text-white">Blogs</h3>
              <p className="mt-1 text-sm text-gray-400">Manage your blog posts</p>
            </Link>
            <Link
              href="/news"
              className="p-4 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-medium text-white">News</h3>
              <p className="mt-1 text-sm text-gray-400">Manage your news posts</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 