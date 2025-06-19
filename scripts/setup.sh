#!/bin/bash

# NextBlog Setup Script
# This script sets up the NextBlog project by installing dependencies, 
# configuring environment variables, and preparing the database.

# Color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}==============================================${NC}"
echo -e "${GREEN}     Welcome to NextBlog Setup Script       ${NC}"
echo -e "${GREEN}==============================================${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed. Please install Node.js and npm first.${NC}"
    exit 1
fi

# Step 1: Install dependencies
echo -e "\n${YELLOW}Step 1: Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to install dependencies.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed successfully.${NC}"

# Step 2: Check if .env.local exists, create if not
echo -e "\n${YELLOW}Step 2: Checking environment configuration...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    
    # Generate a secure random string for NEXTAUTH_SECRET
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    
    cat > .env.local << EOL
# Authentication
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXTAUTH_URL=http://localhost:3000

# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecureAdminPassword123!

# Sanity configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=uq67vijz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-11-01
SANITY_API_TOKEN=your_sanity_api_token

# Database - Using a placeholder - replace with your actual database URL in production
DATABASE_URL="postgresql://username:password@localhost:5432/NextBlog?sslmode=require"

# OAuth providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
EOL
    echo -e "${GREEN}✓ Created .env.local file with secure random secret.${NC}"
    echo -e "${YELLOW}Note: You will need to update the database URL and other credentials in .env.local${NC}"
else
    echo -e "${GREEN}✓ .env.local file already exists.${NC}"
fi

# Step 3: Generate Prisma client
echo -e "\n${YELLOW}Step 3: Generating Prisma client...${NC}"
npx prisma generate
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to generate Prisma client.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Prisma client generated successfully.${NC}"

# Step 4: Ask about database setup
echo -e "\n${YELLOW}Step 4: Database setup${NC}"
echo -e "Would you like to attempt to set up the database? This requires a PostgreSQL server configured in your .env.local file."
read -p "Set up database now? (y/n): " SETUP_DB

if [[ $SETUP_DB == "y" || $SETUP_DB == "Y" ]]; then
    echo -e "${YELLOW}Setting up database...${NC}"
    node scripts/setup-database.js --seed
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: Database setup failed. Please check your database connection and try again.${NC}"
        echo -e "${YELLOW}You can manually set up the database later with: node scripts/setup-database.js${NC}"
    else
        echo -e "${GREEN}✓ Database set up successfully.${NC}"
    fi
else
    echo -e "${YELLOW}Skipping database setup.${NC}"
    echo -e "${YELLOW}You can manually set up the database later with: node scripts/setup-database.js${NC}"
fi

# Step 5: Building the application
echo -e "\n${YELLOW}Step 5: Building the application...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Warning: Build process encountered issues.${NC}"
    echo -e "${YELLOW}You can still run the development server.${NC}"
else
    echo -e "${GREEN}✓ Application built successfully.${NC}"
fi

# Done
echo -e "\n${GREEN}==============================================${NC}"
echo -e "${GREEN}     NextBlog Setup Complete!               ${NC}"
echo -e "${GREEN}==============================================${NC}"
echo -e "\nYou can start the development server with: ${YELLOW}npm run dev${NC}"
echo -e "Access the application at: ${YELLOW}http://localhost:3000${NC}"
echo -e "\n${YELLOW}Don't forget to update your environment variables in .env.local${NC}"
echo -e "${YELLOW}especially your database connection string and admin credentials.${NC}" 