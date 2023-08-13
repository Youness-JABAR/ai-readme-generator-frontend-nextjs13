"use client"
import { useState } from 'react';

interface ApiResponse {
  response: string;
}

export default function ReadmeGenerator() {
  const [promptInput, setPromptInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/generate_readme/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt_input: promptInput,
        }),
      });

      const data: ApiResponse = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Generate README</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Enter your prompt here..."
            rows={6}
          />
          <button
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            type="submit"
          >
            Generate README
          </button>
        </form>
        {response && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Generated README</h2>
            <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
