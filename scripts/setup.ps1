# NextBlog Setup Script (PowerShell)
# This script sets up the NextBlog project by installing dependencies, 
# configuring environment variables, and preparing the database.

Write-Host "=============================================="
Write-Host "     Welcome to NextBlog Setup Script       "
Write-Host "=============================================="

# Check if npm is installed
try {
    npm -v | Out-Null
}
catch {
    Write-Host "Error: npm is not installed. Please install Node.js and npm first." -ForegroundColor Red
    exit 1
}

# Step 1: Install dependencies
Write-Host "`nStep 1: Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✓ Dependencies installed successfully." -ForegroundColor Green
}
catch {
    Write-Host "Error: Failed to install dependencies." -ForegroundColor Red
    exit 1
}

# Step 2: Check if .env.local exists, create if not
Write-Host "`nStep 2: Checking environment configuration..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Write-Host "Creating .env.local file..." -ForegroundColor Yellow
    
    # Generate a secure random string for NEXTAUTH_SECRET
    $NEXTAUTH_SECRET = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
    
    $envContent = @"
# Authentication
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
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
"@

    Set-Content -Path ".env.local" -Value $envContent
    Write-Host "✓ Created .env.local file with secure random secret." -ForegroundColor Green
    Write-Host "Note: You will need to update the database URL and other credentials in .env.local" -ForegroundColor Yellow
}
else {
    Write-Host "✓ .env.local file already exists." -ForegroundColor Green
}

# Step 3: Generate Prisma client
Write-Host "`nStep 3: Generating Prisma client..." -ForegroundColor Yellow
try {
    npx prisma generate
    Write-Host "✓ Prisma client generated successfully." -ForegroundColor Green
}
catch {
    Write-Host "Error: Failed to generate Prisma client." -ForegroundColor Red
    exit 1
}

# Step 4: Ask about database setup
Write-Host "`nStep 4: Database setup" -ForegroundColor Yellow
Write-Host "Would you like to attempt to set up the database? This requires a PostgreSQL server configured in your .env.local file."
$SETUP_DB = Read-Host "Set up database now? (y/n)"

if ($SETUP_DB -eq "y" -or $SETUP_DB -eq "Y") {
    Write-Host "Setting up database..." -ForegroundColor Yellow
    try {
        node scripts/setup-database.js --seed
        Write-Host "✓ Database set up successfully." -ForegroundColor Green
    }
    catch {
        Write-Host "Error: Database setup failed. Please check your database connection and try again." -ForegroundColor Red
        Write-Host "You can manually set up the database later with: node scripts/setup-database.js" -ForegroundColor Yellow
    }
}
else {
    Write-Host "Skipping database setup." -ForegroundColor Yellow
    Write-Host "You can manually set up the database later with: node scripts/setup-database.js" -ForegroundColor Yellow
}

# Step 5: Building the application
Write-Host "`nStep 5: Building the application..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✓ Application built successfully." -ForegroundColor Green
}
catch {
    Write-Host "Warning: Build process encountered issues." -ForegroundColor Red
    Write-Host "You can still run the development server." -ForegroundColor Yellow
}

# Done
Write-Host "`n=============================================="
Write-Host "     NextBlog Setup Complete!               "
Write-Host "=============================================="
Write-Host "`nYou can start the development server with: npm run dev" -ForegroundColor Yellow
Write-Host "Access the application at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "`nDon't forget to update your environment variables in .env.local" -ForegroundColor Yellow
Write-Host "especially your database connection string and admin credentials." -ForegroundColor Yellow 