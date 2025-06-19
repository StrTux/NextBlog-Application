/**
 * Database Setup Script
 * 
 * This script automates the setup of the database for the NextBlog application.
 * It runs Prisma migrations and optionally seeds the database with initial data.
 * 
 * Usage:
 * - Run `node scripts/setup-database.js` to migrate the database
 * - Run `node scripts/setup-database.js --seed` to migrate and seed the database
 */

const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Prisma client
const prisma = new PrismaClient();

// Handle command line arguments
const args = process.argv.slice(2);
const shouldSeed = args.includes('--seed');
const resetDb = args.includes('--reset');

// Color coding for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Function to color console output
function colorize(text, color) {
  // Skip colors on Windows as they may not display correctly without special configuration
  if (process.platform === 'win32') {
    return text;
  }
  return colors[color] + text + colors.reset;
}

// Database setup function
async function setupDatabase() {
  console.log(colorize('Starting database setup...', 'cyan'));

  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set in .env.local');
    }

    // Reset database if requested
    if (resetDb) {
      console.log(colorize('Resetting database...', 'yellow'));
      try {
        execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
        console.log(colorize('Database reset successful', 'green'));
      } catch (error) {
        console.error(colorize('Failed to reset database:', 'red'), error.message);
        process.exit(1);
      }
    } else {
      // Run migrations
      console.log(colorize('Running database migrations...', 'yellow'));
      try {
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
        console.log(colorize('Migrations applied successfully', 'green'));
      } catch (error) {
        console.error(colorize('Failed to run migrations:', 'red'), error.message);
        process.exit(1);
      }
    }

    // Seed the database if requested
    if (shouldSeed) {
      await seedDatabase();
    }

    console.log(colorize('Database setup completed successfully!', 'green'));
  } catch (error) {
    console.error(colorize('Database setup failed:', 'red'), error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Database seeding function
async function seedDatabase() {
  console.log(colorize('Seeding database with initial data...', 'yellow'));

  try {
    // Check if admin user exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'SecureAdminPassword123!';

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      // Hash admin password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      // Create admin user
      await prisma.user.create({
        data: {
          name: 'Admin User',
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN',
          emailVerified: new Date(),
        },
      });
      console.log(colorize(`Admin user created: ${adminEmail}`, 'green'));
    } else {
      console.log(colorize(`Admin user already exists: ${adminEmail}`, 'blue'));
    }

    // Seed additional data
    await seedAdditionalData();

    console.log(colorize('Database seeding completed successfully!', 'green'));
  } catch (error) {
    console.error(colorize('Database seeding failed:', 'red'), error.message);
    throw error;
  }
}

// Seed additional data (categories, sample stories, etc.)
async function seedAdditionalData() {
  // Seed categories
  const categories = [
    { name: 'Fiction', description: 'Imaginative stories not based in reality' },
    { name: 'Non-Fiction', description: 'Factual and informative content' },
    { name: 'Poetry', description: 'Artistic literary expressions using rhythm and metaphor' },
    { name: 'Science Fiction', description: 'Fiction with futuristic, scientific elements' },
    { name: 'Fantasy', description: 'Fiction with magical or supernatural elements' },
    { name: 'Mystery', description: 'Fiction focused on solving a puzzle or crime' },
    { name: 'Thriller', description: 'Suspenseful, exciting stories' },
    { name: 'Horror', description: 'Fiction intended to frighten or unsettle' },
    { name: 'Romance', description: 'Stories centered on relationships and love' },
    { name: 'Historical', description: 'Stories set in the past, often with historical events' },
  ];

  // Check if categories already exist
  const existingCategoryCount = await prisma.category.count();
  if (existingCategoryCount === 0) {
    for (const category of categories) {
      await prisma.category.create({
        data: category,
      });
    }
    console.log(colorize(`Created ${categories.length} categories`, 'green'));
  } else {
    console.log(colorize(`Categories already exist (${existingCategoryCount})`, 'blue'));
  }

  // Add more seed data here as needed (sample stories, etc.)
}

// Run the setup
setupDatabase().catch((e) => {
  console.error(colorize('Unhandled error during database setup:', 'red'), e);
  process.exit(1);
}); 