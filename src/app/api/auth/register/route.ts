import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../[...nextauth]/route';

// Define input validation schema
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.format();
      return NextResponse.json(
        { 
          message: 'Validation error', 
          errors 
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password with a cost factor of 12
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: 'USER',
      },
    });

    // Remove sensitive information from response
    const { hashedPassword: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Check if this is a database connection error
    if (error.code === 'P2021') {
      return NextResponse.json(
        { message: 'Database not set up properly. Please contact administrator.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
} 