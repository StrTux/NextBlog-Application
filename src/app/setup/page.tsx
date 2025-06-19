'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'confirmation' | 'processing' | 'complete'>('confirmation');
  const [includeSeeds, setIncludeSeeds] = useState(true);

  const handleSetup = async () => {
    setIsLoading(true);
    setError(null);
    setStep('processing');

    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seed: includeSeeds }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
      } else {
        setResult({ success: false, message: data.error || 'An unknown error occurred' });
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error('Setup error:', err);
    } finally {
      setIsLoading(false);
      setStep('complete');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">NextBlog Setup</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Database and initial configuration setup.
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          {step === 'confirmation' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Attention</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        You are about to set up the NextBlog database. This operation may modify your existing database
                        if it exists. Make sure your database connection is properly configured in your .env.local file.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSeeds}
                    onChange={(e) => setIncludeSeeds(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">
                    Include seed data (admin user, categories, etc.)
                  </span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <Link 
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </Link>
                <button
                  onClick={handleSetup}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start Setup
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-lg text-gray-700">Setting up the database...</p>
              <p className="mt-2 text-sm text-gray-500">This may take a few moments.</p>
            </div>
          )}

          {step === 'complete' && (
            <div className="space-y-6">
              {result && (
                <div className={`p-4 rounded-md ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {result.success ? (
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                        {result.success ? 'Setup Successful' : 'Setup Failed'}
                      </h3>
                      <div className={`mt-2 text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                        <p>{result.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-md bg-red-50">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Link 
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Homepage
                </Link>
                {!result?.success && (
                  <button
                    onClick={() => setStep('confirmation')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 