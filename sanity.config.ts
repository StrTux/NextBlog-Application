import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
// Since we don't have direct access to the schema types, we'll create a placeholder
// In a real implementation, you would properly import the schema types from your Sanity project

// Placeholder for schema types - in production, replace with actual schemas
const schemaTypes = [
  // You would define your schemas here or import them from your Sanity project
  // Example schema for Article
  {
    name: 'article',
    title: 'Article',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'publishedAt', title: 'Published at', type: 'datetime' },
      { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    ],
  },
  // Example schema for Blog
  {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'publishedAt', title: 'Published at', type: 'datetime' },
      { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    ],
  },
  // Example schema for News
  {
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'publishedAt', title: 'Published at', type: 'datetime' },
      { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    ],
  },
  // Example schema for Category
  {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'description', title: 'Description', type: 'text' },
    ],
  },
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [deskTool()],
  title: 'NextBlog Admin',
}); 