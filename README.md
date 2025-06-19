# NextBlog

NextBlog is a modern content platform built with Next.js, Sanity CMS, and PostgreSQL. It provides a sleek black and white UI for reading articles, blogs, and news.

## Project Structure

The project consists of two main parts:

1. **NextBlog (Next.js frontend)** - The main website where users can read content
2. **Sanity Studio (CMS)** - The admin interface for managing content

## Features

- **Articles, Blogs, and News** - Different content types for various purposes
- **Categories** - Content organized by topics
- **User Authentication** - Sign in/sign up functionality
- **Admin Dashboard** - Manage content through Sanity Studio
- **PostgreSQL Database** - Stores user data, comments, and likes
- **Responsive Design** - Works on mobile and desktop

## How to Use

### As a Reader

1. Browse articles, blogs, and news on the main website
2. Sign up for an account to like and comment on content
3. Save articles to read later with bookmarks

### As an Admin

1. Access Sanity Studio at `/studio` 
2. Log in with your Sanity credentials
3. Create and edit content through the Sanity interface
4. Publish content to make it visible on the site

## Getting Started

1. Start the Next.js frontend:
   ```
   cd NextBlog
   npm run dev
   ```

2. Start Sanity Studio:
   ```
   cd my-sanity-project
   npm run dev
   ```

## Database Setup

The project uses PostgreSQL for user data. Configure your database connection in the `.env` file.

## Admin Access

Admin credentials are stored in the `.env.local` file and should be kept confidential.

## Current Issues and Fixes Required

1. **Authentication Issues**
   - Sign-in and sign-up functionality not working properly
   - Environment variables not being loaded correctly for authentication
   - Need to fix JWT token generation and validation
   - Session persistence not working correctly
   - OAuth providers (Google, GitHub) need proper configuration

2. **Environment Variables**
   - Create a proper `.env.local` file in the NextBlog root directory
   - Add the following variables:
     ```
     # Authentication
     NEXTAUTH_SECRET=your_secret_key_here
     NEXTAUTH_URL=http://localhost:3000
     
     # Admin credentials
     ADMIN_EMAIL=your_admin_email@example.com
     ADMIN_PASSWORD=your_secure_admin_password
     
     # Sanity configuration
     NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
     NEXT_PUBLIC_SANITY_DATASET=production
     SANITY_API_TOKEN=your_sanity_api_token
     
     # Database
     DATABASE_URL=postgresql://username:password@localhost:5432/NextBlog
     ```
   - Ensure the environment variables are properly loaded in authentication logic

3. **Data Flow Issues**
   - Connect form submissions to API endpoints
   - Fix data passing between components
   - Ensure proper error handling for API requests
   - Implement proper validation for user inputs

## Fixed Issues

1. **Authentication System**
   - ✅ Implemented proper NextAuth.js configuration
   - ✅ Created registration API endpoint with password hashing
   - ✅ Added admin and user authentication flows
   - ✅ Set up proper session management
   - ✅ Connected OAuth providers (Google, GitHub)
   - ✅ Fixed environment variable configurations

2. **Environment Variables**
   - ✅ Created proper .env.local file structure
   - ✅ Fixed database connection string
   - ✅ Added correct Sanity project ID and configuration
   - ✅ Set proper NEXTAUTH_SECRET and URL values

3. **User Interface**
   - ✅ Created proper sign-in and sign-up pages
   - ✅ Connected sign-in/sign-up to authentication system
   - ✅ Fixed responsive design issues
   - ✅ Improved error handling and user feedback

## Remaining Work

1. **Sanity Integration**
   - Complete content type definitions in Sanity schema
   - Connect content creation forms with Sanity mutation API
   - Implement image upload functionality with Sanity asset store
   - Set up real-time preview of content changes

2. **User Management**
   - Create profile management pages
   - Add email verification workflow
   - Implement account recovery and password reset
   - Add user preference settings

3. **Content Display**
   - Implement proper data fetching from Sanity with ISR
   - Create paginated listing pages for content types
   - Add filtering and sorting capabilities
   - Implement search functionality

4. **Admin Dashboard**
   - Connect dashboard stats to real data sources
   - Implement content moderation workflows
   - Add user management interface
   - Create analytics dashboard

5. **AI Features**
   - Implement content recommendation system
   - Add AI-assisted content creation tools
   - Create automatic content summarization
   - Implement sentiment analysis for comments

## How to Test the Authentication System

1. **Regular User Registration**
   - Go to `/signup` and create a new user account
   - Verify login works at `/signin`
   - Check user-specific features are available

2. **Admin Authentication**
   - Go to `/signin` and check the "Sign in as Admin" box
   - Use the admin credentials configured in your `.env.local` file
   - Verify admin dashboard access at `/admin`

3. **OAuth Authentication**
   - Test Google and GitHub login once OAuth credentials are configured
   - Verify social login redirects and callbacks work properly

## Debugging Tips

1. For authentication issues:
   - Check browser console for errors
   - Ensure environment variables are properly set
   - Verify API routes are correctly implemented

2. For Sanity integration:
   - Confirm Sanity Studio is running
   - Verify Sanity project ID and dataset are correct
   - Check CORS settings for the Sanity project

3. For database connection:
   - Ensure PostgreSQL is running
   - Verify connection string in environment variables
   - Check database schema matches expected models

## Issues and Remaining Functionalities

1. **Sanity Studio Integration**
   - Fix the import path in sanity.config.ts for schema types
   - Connect schema types from my-sanity-project to NextBlog frontend
   - Ensure Sanity Studio loads properly in the /studio route

2. **Admin Authentication**
   - Update sign-in page to use environment variables for admin credentials
   - Create proper JWT token-based authentication for admin access
   - Add session persistence for admin users
   - Set up role-based authorization (admin vs regular users)

3. **Content Management**
   - Implement actual content creation functionality in admin panel
   - Connect content forms to Sanity APIs
   - Add image upload functionality with proper validation
   - Create editorial workflow (draft, review, publish)
   - Add content versioning and history

4. **Database Integration**
   - Configure PostgreSQL connection properly
   - Create and migrate database schemas
   - Set up user tables, content relation tables, and other necessary schemas
   - Implement data validation and sanitization

5. **User Authentication**
   - Implement actual authentication logic (currently mocked)
   - Add email verification for new accounts
   - Implement password reset functionality
   - Add OAuth providers (Google, GitHub) integration
   - Implement proper session management and security

6. **Content Display Pages**
   - Create dynamic routes for individual articles, blogs, and news items
   - Implement content fetching from Sanity for detail pages
   - Add metadata for SEO optimization
   - Implement content recommendations
   - Create category and tag filtering

7. **API Routes**
   - Develop REST API endpoints for content interaction
   - Create user management API endpoints
   - Implement comment and like functionality endpoints
   - Add rate limiting and security measures

8. **Frontend Components**
   - Create a rich text editor for content creation
   - Implement dynamic content loading with proper loading states
   - Add proper error handling and fallbacks
   - Create reusable UI components for content cards, user profiles, etc.

9. **Responsive Design**
   - Ensure consistent experience across devices
   - Optimize images and layout for mobile
   - Implement proper navigation for mobile users

10. **User Profile**
    - Develop user profile pages
    - Add user preferences and settings
    - Implement bookmarking and favorites functionality
    - Create reading history tracking

11. **Comment System**
    - Build comment posting and display functionality
    - Add nested replies to comments
    - Implement comment moderation for admins
    - Add notification system for comment replies

12. **Search Functionality**
    - Create search API with proper indexing
    - Implement frontend search interface
    - Add filters and sorting options
    - Create advanced search functionality

13. **Performance Optimization**
    - Implement proper caching strategies
    - Optimize image loading and processing
    - Add lazy loading for content
    - Implement code splitting and bundle optimization

14. **Testing**
    - Add unit tests for components and functions
    - Implement integration tests for API routes
    - Set up end-to-end testing
    - Create test environments and CI/CD pipeline

15. **Deployment**
    - Configure production deployment settings
    - Set up environment variables for production
    - Implement proper logging and monitoring
    - Configure CDN and optimization strategies

16. **Security**
    - Implement proper CSRF protection
    - Add rate limiting for APIs
    - Set up proper authorization checks
    - Sanitize user inputs and content

17. **Analytics**
    - Integrate analytics tracking
    - Create dashboard for content performance
    - Implement user behavior tracking
    - Add conversion and engagement metrics

18. **Notification System**
    - Build email notification system
    - Implement in-app notifications
    - Add subscription management
    - Create notification preferences

19. **Content Recommendations**
    - Implement algorithm for related content
    - Create personalized recommendations based on user behavior
    - Add trending content section
    - Develop content discovery features

20. **Social Sharing**
    - Add social sharing buttons
    - Implement proper meta tags for shared content
    - Create embed functionality for content
    - Add tracking for shared content performance

21. **Monetization Features**
    - Implement subscription model if needed
    - Add premium content functionality
    - Create payment processing integration
    - Develop analytics for revenue tracking

22. **Content Management Workflow**
    - Implement content scheduling
    - Add collaboration features for teams
    - Create editorial calendar
    - Implement content review process

23. **Mobile App Considerations**
    - Make the API ready for potential mobile app
    - Implement proper authentication for app users
    - Create offline reading capabilities
    - Design responsive interfaces for app integration

24. **Internationalization**
    - Add multi-language support
    - Implement proper localization
    - Create region-specific content
    - Add language preferences

25. **Accessibility**
    - Ensure WCAG compliance
    - Add proper aria labels and roles
    - Implement keyboard navigation
    - Test with screen readers

26. **Legal and Compliance**
    - Add proper terms of service
    - Implement privacy policy
    - Create cookie consent mechanism
    - Ensure GDPR compliance

27. **Documentation**
    - Create comprehensive API documentation
    - Add admin user guide
    - Create contributor documentation
    - Document codebase properly

28. **Backup and Recovery**
    - Implement database backup strategy
    - Create content recovery mechanisms
    - Add disaster recovery plan
    - Implement data retention policies

29. **Scalability**
    - Prepare the architecture for scaling
    - Implement proper database indexing
    - Add caching layers
    - Design for high availability

30. **Integration with Third-party Services**
    - Add email service provider integration
    - Implement social media posting
    - Create webhook system for integrations
    - Add analytics service connections

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
