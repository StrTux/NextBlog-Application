'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    
    try {
      // Register user
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Sign in after successful registration
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setError(result.error);
      } else {
        // Registration and sign-in successful
        router.push('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during registration');
      }
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-md w-full mx-auto py-16 px-4 sm:py-24 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Create an Account
          </h1>
          <p className="mt-3 text-gray-400">
            Join NextBlog to access exclusive content
          </p>
        </div>
        
        <div className="mt-8 bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-900 text-white p-3 rounded">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Must be at least 8 characters
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-black focus:ring-white border-gray-600 rounded bg-gray-800"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Sign up'}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or sign up with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
              >
                Google
              </button>
              <button
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
              >
                GitHub
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-white hover:text-gray-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 