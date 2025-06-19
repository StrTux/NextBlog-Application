'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Placeholder for Sanity client functionality
const createArticle = async (articleData: ArticleFormData) => {
  // In a real implementation, this would send data to Sanity
  console.log('Creating article with data:', articleData);
  
  // For demo purposes, simulate a successful creation
  return { _id: 'new-article-id', slug: { current: articleData.slug } };
};

interface Category {
  _id: string;
  title: string;
}

interface Author {
  _id: string;
  name: string;
}

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  publishedAt: string;
  content: string;
  categoryId: string;
  authorId: string;
  tags: string;
}

export default function CreateArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  
  // Mock data for categories and authors
  // In a real implementation, these would be fetched from Sanity
  const categories: Category[] = [
    { _id: 'cat1', title: 'Development' },
    { _id: 'cat2', title: 'Design' },
    { _id: 'cat3', title: 'Technology' },
    { _id: 'cat4', title: 'Business' },
  ];
  
  const authors: Author[] = [
    { _id: 'auth1', name: 'John Doe' },
    { _id: 'auth2', name: 'Jane Smith' },
    { _id: 'auth3', name: 'Bob Johnson' },
  ];
  
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    excerpt: '',
    mainImage: '',
    publishedAt: new Date().toISOString().split('T')[0],
    content: '',
    categoryId: categories[0]?._id || '',
    authorId: authors[0]?._id || '',
    tags: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'title' && !formData.slug) {
      // Auto-generate slug from title
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      setFormData({ ...formData, title: value, slug });
    } else if (name === 'mainImage') {
      setPreviewImage(value);
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate form
      if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.mainImage) {
        throw new Error('Please fill in all required fields');
      }
      
      // Create article
      const result = await createArticle(formData);
      
      // Redirect to the new article
      router.push(`/admin/articles/${result.slug.current}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while creating the article');
      }
      console.error('Error creating article:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white text-black min-h-screen pb-12">
      <div className="max-w-5xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create New Article</h1>
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 border border-white rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-900"
          >
            Back to Admin
          </Link>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-900 text-white p-4 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-300">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="excerpt"
                  id="excerpt"
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-300">
                  Publication Date
                </label>
                <input
                  type="date"
                  name="publishedAt"
                  id="publishedAt"
                  value={formData.publishedAt}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="mainImage" className="block text-sm font-medium text-gray-300">
                  Main Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mainImage"
                  id="mainImage"
                  value={formData.mainImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              
              {previewImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-400 mb-2">Image Preview:</p>
                  <div className="relative h-40 w-full">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  id="content"
                  rows={12}
                  value={formData.content}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                  placeholder="Write your article content here..."
                />
                <p className="mt-1 text-xs text-gray-400">
                  Use markdown formatting for headings, lists, and emphasis.
                </p>
              </div>
              
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-300">
                  Category
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="authorId" className="block text-sm font-medium text-gray-300">
                  Author
                </label>
                <select
                  name="authorId"
                  id="authorId"
                  value={formData.authorId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                >
                  {authors.map((author) => (
                    <option key={author._id} value={author._id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="tag1, tag2, tag3"
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Separate tags with commas
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 