'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Simulated data - in a real app, you would fetch this from your database
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ];
  
  const comments = [
    { id: 1, user: 'John Doe', content: 'Great article!', article: 'Getting Started with Next.js', date: '2023-03-15' },
    { id: 2, user: 'Jane Smith', content: 'Very informative, thanks!', article: 'Introduction to Sanity CMS', date: '2023-03-14' },
    { id: 3, user: 'Bob Johnson', content: 'I have a question about...', article: 'PostgreSQL Best Practices', date: '2023-03-13' },
  ];
  
  const recentContent = [
    { id: 1, type: 'Article', title: 'Getting Started with Next.js', author: 'Jane Smith', date: '2023-03-15', status: 'Published' },
    { id: 2, type: 'Blog', title: 'Building Modern Websites with Next.js and Sanity', author: 'John Doe', date: '2023-03-14', status: 'Draft' },
    { id: 3, type: 'News', title: 'Next.js 14 Released', author: 'Bob Johnson', date: '2023-03-13', status: 'Published' },
  ];
  
  const stats = [
    { name: 'Total Users', value: '3' },
    { name: 'Published Articles', value: '12' },
    { name: 'Published Blogs', value: '8' },
    { name: 'Published News', value: '15' },
    { name: 'Comments', value: '42' },
    { name: 'Categories', value: '6' },
  ];
  
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center border-b border-gray-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200"
          >
            Back to Admin Home
          </Link>
        </div>
        
        {/* Create Content Buttons */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Create New Content</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/create/article"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200"
            >
              New Article
            </Link>
            <Link
              href="/admin/create/blog"
              className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
            >
              New Blog Post
            </Link>
            <Link
              href="/admin/create/news"
              className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
            >
              New News Article
            </Link>
            <Link
              href="/admin/create/category"
              className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
            >
              New Category
            </Link>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-900 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-400 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-white">{stat.value}</dd>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-800 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'overview' 
                  ? 'border-white text-white' 
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}
              `}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'users' 
                  ? 'border-white text-white' 
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}
              `}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'comments' 
                  ? 'border-white text-white' 
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}
              `}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'content' 
                  ? 'border-white text-white' 
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}
              `}
            >
              Content
            </button>
          </nav>
        </div>
        
        {/* Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold mb-3">Recent Activity</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>New user registered</span>
                      <span className="text-gray-400">2 hours ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>New article published</span>
                      <span className="text-gray-400">5 hours ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Comment approved</span>
                      <span className="text-gray-400">1 day ago</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/admin/create/article"
                      className="px-4 py-2 border border-gray-700 rounded-md text-center text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
                    >
                      Add Article
                    </Link>
                    <Link
                      href="/admin/users"
                      className="px-4 py-2 border border-gray-700 rounded-md text-center text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
                    >
                      Manage Users
                    </Link>
                    <Link
                      href="/admin/comments"
                      className="px-4 py-2 border border-gray-700 rounded-md text-center text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
                    >
                      Approve Comments
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="px-4 py-2 border border-gray-700 rounded-md text-center text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
                    >
                      Site Settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-800 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-gray-900">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {user.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-white hover:text-gray-300">Edit</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'comments' && (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-800 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-gray-900">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Content
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Article
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {comments.map((comment) => (
                          <tr key={comment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {comment.user}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">
                              {comment.content}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {comment.article}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {comment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-white hover:text-gray-300 mr-4">Approve</a>
                              <a href="#" className="text-red-400 hover:text-red-300">Delete</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'content' && (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-800 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-gray-900">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Author
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {recentContent.map((content) => (
                          <tr key={content.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {content.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {content.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {content.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {content.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${content.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {content.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-white hover:text-gray-300 mr-2">Edit</a>
                              <a href="#" className="text-red-400 hover:text-red-300">Delete</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 