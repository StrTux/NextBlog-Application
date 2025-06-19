import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const execPromise = util.promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Check if the user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    // Only allow admin or setup requests on development/local environments
    const isLocalEnv = process.env.NODE_ENV === 'development';
    const isAdmin = session?.user?.role === 'ADMIN';
    
    if (!isLocalEnv && !isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. You must be an admin to perform this action.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const shouldSeed = body.seed === true;

    // Determine which command to run based on seed parameter
    const setupCommand = shouldSeed 
      ? 'node scripts/setup-database.js --seed'
      : 'node scripts/setup-database.js';

    // Execute the setup command
    const { stdout, stderr } = await execPromise(setupCommand);
    
    // Check if there were any errors in stderr
    if (stderr && !stderr.includes('Deprecated')) {
      console.error('Setup error:', stderr);
      return NextResponse.json(
        { error: 'Database setup failed. See server logs for details.' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      message: 'Database setup completed successfully!',
      details: stdout
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'An unknown error occurred during setup'
      },
      { status: 500 }
    );
  }
} 