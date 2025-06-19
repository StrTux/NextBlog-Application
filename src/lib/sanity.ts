import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-03-19';

// Create a client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// For images
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to fetch data from Sanity
// In a real implementation, you would use the GROQ query language to fetch exactly what you need
export async function fetchFromSanity(query: string, params = {}) {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    throw error;
  }
}

// Example queries (commented out for reference)

/*
// Get all articles
export async function getAllArticles() {
  return fetchFromSanity(`*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->{name, image},
    "categories": categories[]->title
  }`);
}

// Get a single article by slug
export async function getArticleBySlug(slug: string) {
  return fetchFromSanity(`*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    mainImage,
    "author": author->{name, image},
    "categories": categories[]->title
  }`, { slug });
}
*/

// For now, return mock data to simulate fetching from Sanity
export async function getAllArticles() {
  return [
    {
      _id: '1',
      title: 'Understanding Next.js and Sanity Integration',
      slug: { current: 'understanding-nextjs-and-sanity' },
      publishedAt: '2023-03-15',
      excerpt: 'Learn how to integrate Next.js with Sanity CMS for a powerful content management solution.',
      mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      author: {
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      categories: ['Development', 'Next.js'],
    },
    // Add more mock articles as needed
  ];
}

export async function getArticleBySlug(slug: string) {
  // Return mock data for the specific article
  return {
    _id: '1',
    title: 'Understanding Next.js and Sanity Integration',
    slug: { current: 'understanding-nextjs-and-sanity' },
    publishedAt: '2023-03-15',
    excerpt: 'Learn how to integrate Next.js with Sanity CMS for a powerful content management solution.',
    mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: {
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    categories: ['Development', 'Next.js'],
    body: [
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
    ]
  };
}

// Article fetching utilities
export async function getArticles(limit = 10) {
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc)[0...${limit}]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "author": author->{name, "slug": slug.current, image},
      readTime
    }`
  );
}

// Blog fetching utilities
export async function getBlogPosts(limit = 10) {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc)[0...${limit}]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "author": author->{name, "slug": slug.current, image}
    }`
  );
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      content,
      "category": category->{title, "slug": slug.current},
      "author": author->{name, "slug": slug.current, image, bio},
      tags,
      seo
    }`,
    { slug }
  );
}

// News fetching utilities
export async function getNewsPosts(limit = 10) {
  return client.fetch(
    `*[_type == "newsPost"] | order(publishedAt desc)[0...${limit}]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      featured,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "authors": authors[]->{name, "slug": slug.current, image}
    }`
  );
}

export async function getNewsPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      content,
      "category": category->{title, "slug": slug.current},
      "authors": authors[]->{name, "slug": slug.current, image, bio},
      source,
      tags
    }`,
    { slug }
  );
}

// Category utilities
export async function getCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc){
      _id,
      title,
      "slug": slug.current,
      description,
      color,
      icon
    }`
  );
}

export async function getCategoryBySlug(slug: string) {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      color,
      icon
    }`,
    { slug }
  );
}

// Author utilities
export async function getAuthors() {
  return client.fetch(
    `*[_type == "author"] | order(name asc){
      _id,
      name,
      "slug": slug.current,
      image
    }`
  );
}

export async function getAuthorBySlug(slug: string) {
  return client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      image,
      bio,
      email,
      social
    }`,
    { slug }
  );
} 