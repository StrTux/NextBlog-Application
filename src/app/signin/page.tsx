'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        isAdmin: isAdmin.toString(),
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        // Successful login
        if (isAdmin) {
          router.push('/admin');
        } else {
          router.push(callbackUrl);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl });
  };

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl });
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-md w-full mx-auto py-16 px-4 sm:py-24 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Sign In
          </h1>
          <p className="mt-3 text-gray-500">
            Access your NextBlog account
          </p>
        </div>

        <div className="mt-8 bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-100 text-red-800 p-3 rounded">
              <p>{error}</p>
              {error.includes("Database not set up") && (
                <p className="mt-2 text-sm">
                  This demo app requires database setup. Try signing in as an admin using the checkbox below.
                </p>
              )}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-white text-gray-800 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-white text-gray-800 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-gray-600 hover:text-gray-800">
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="admin-login"
                name="admin-login"
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                className="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label htmlFor="admin-login" className="ml-2 block text-sm text-gray-700">
                Sign in as Admin
              </label>
            </div>
            
            {isAdmin && (
              <div className="rounded-md bg-gray-100 p-3">
                <p className="text-xs text-gray-600 mb-1">Admin access is restricted.</p>
                <p className="text-xs text-gray-600">Please use authorized admin credentials.</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Google
                </button>
              </div>
              <div>
                <button
                  onClick={handleGitHubSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-gray-700 hover:text-gray-900">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 