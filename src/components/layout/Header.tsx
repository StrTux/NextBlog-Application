'use client';

import Link from 'next/link';
import { useState } from 'react';
import './header.css'
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="matangi flex-shrink-0 flex items-center">
              <Link href="/" className="matangi font-bold  text-gray-800">
                NextBlog
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/articles" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-gray-800 hover:border-gray-800"
              >
                Articles
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-gray-800 hover:border-gray-800"
              >
                Blog
              </Link>
              <Link 
                href="/news" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-gray-800 hover:border-gray-800"
              >
                News
              </Link>
              <Link 
                href="/categories" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-gray-800 hover:border-gray-800"
              >
                Categories
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <Link 
                href="/signin" 
                className="inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/articles" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 hover:border-gray-800"
            >
              Articles
            </Link>
            <Link 
              href="/blog" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 hover:border-gray-800"
            >
              Blog
            </Link>
            <Link 
              href="/news" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 hover:border-gray-800"
            >
              News
            </Link>
            <Link 
              href="/categories" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 hover:border-gray-800"
            >
              Categories
            </Link>
            <div className="mt-3 px-3">
              <Link 
                href="/signin" 
                className="block w-full px-4 py-2 border border-gray-800 text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 