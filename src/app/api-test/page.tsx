'use client';

import { useState } from 'react';

export default function ApiTestPage() {
  const [url, setUrl] = useState('/api/auth/callback/credentials');
  const [method, setMethod] = useState('POST');
  const [requestBody, setRequestBody] = useState(JSON.stringify({
    email: "abhitiwari9857@gmail.com",
    password: "Abhi@#$9857",
    isAdmin: "true"
  }, null, 2));
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      // Get CSRF token first for any auth-related requests
      const csrfResponse = await fetch('/api/auth/csrf');
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;

      // Parse the request body
      const body = JSON.parse(requestBody);
      
      // Add CSRF token if this is an auth request
      const finalBody = url.includes('/auth/') 
        ? { ...body, csrfToken } 
        : body;

      // Make the API request
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalBody),
      });

      // Parse and display the response
      const data = await response.json();
      setResponse(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data
      }, null, 2));
    } catch (error: any) {
      setResponse(JSON.stringify({
        error: error.message
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test Tool</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">API URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-300"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Request Body (JSON)</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-300 font-mono text-sm"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </form>
        
        <div>
          <h2 className="text-xl font-bold mb-2">Response</h2>
          <pre className="bg-gray-100 p-4 rounded border border-gray-300 overflow-auto max-h-96 font-mono text-sm">
            {response || 'No response yet'}
          </pre>
        </div>
      </div>
    </div>
  );
} 