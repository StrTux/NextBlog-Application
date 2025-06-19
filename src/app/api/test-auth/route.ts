import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, password, isAdmin } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check credentials
    if (isAdmin === 'true') {
      // For admin login, check against environment variables
      // Don't include actual credentials in the response for security
      const adminEmailFromEnv = process.env.ADMIN_EMAIL;
      const adminPasswordFromEnv = process.env.ADMIN_PASSWORD;
      
      const emailMatch = email === adminEmailFromEnv;
      const passwordMatch = password === adminPasswordFromEnv;
      
      return NextResponse.json({
        success: emailMatch && passwordMatch,
        emailMatch,
        passwordMatch,
        message: emailMatch && passwordMatch 
          ? 'Admin credentials valid' 
          : 'Admin credentials invalid',
        // Debug info
        adminEmailAvailable: !!adminEmailFromEnv,
        adminPasswordAvailable: !!adminPasswordFromEnv,
        envCheck: { 
          email: adminEmailFromEnv?.substring(0, 3) + '...',
          password: adminPasswordFromEnv ? '✓ Set' : '✗ Not set'
        }
      });
    } else {
      // For regular users, just return a mock response
      // In a real app, this would check against the database
      return NextResponse.json({
        success: false,
        message: 'Regular user authentication would check against database'
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Authentication check failed' },
      { status: 500 }
    );
  }
} 