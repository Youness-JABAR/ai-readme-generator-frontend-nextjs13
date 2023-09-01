"use client"
import { useState } from 'react';

import MarkdownViewer from './MarkdownViewer';
interface ApiResponse {
  response: string;
}

export default function ReadmeGenerator() {
  const markdownContents = `
  # Hello Markdown!
  
  A paragraph with *emphasis* and **strong importance**.
  
  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  
  This is a **Markdown visualizer** built in Next.js.
  You can render _formatted_ content using Markdown syntax.
  A table:
  
  | a | b |
  | - | - |
  - Lists
  - Emphasis *italic* and **bold**
  - Links [OpenAI](https://www.openai.com)
  - Images ![Markdown Logo](https://markdown-here.com/img/icon256.png)
  `;
  const markdown = `# Foobar
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
  Foobar is a Python library for dealing with word pluralization.
  
  ## Installation
  
  Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.
  
  \`\`\`bash
  pip install foobar
  \`\`\`
  
  ## Usage
  
  \`\`\`python
  import foobar
  
  # returns 'words'
  foobar.pluralize('word')
  
  # returns 'geese'
  foobar.pluralize('goose')
  
  # returns 'phenomenon'
  foobar.singularize('phenomena')
  \`\`\`
  
  ## Contributing
  
  Pull requests are welcome. For major changes, please open an issue first
  to discuss what you would like to change.
  
  Please make sure to update tests as appropriate.
  
  ## License
  
  [MIT](https://choosealicense.com/licenses/mit/)
`
  const [promptInput, setPromptInput] = useState<string>('');
  const [markdownContent, setMarkdownContent] = useState<string>(markdown);


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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className=" w-full p-6 bg-white rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-semibold mb-4">Generate README</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Enter your Package.json content here..."
            rows={6}
          />
          <button
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            type="submit"
          >
            Generate README
          </button>
        </form>

      <div className=" w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Markdown Renderer</h2>
        <div className="grid grid-cols-2 gap-4">
          <textarea
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={markdownContent}
            onChange={(e)=>setMarkdownContent(e.target.value)}
            placeholder="Enter your Package.json content here..."

            rows={10}
          />
          <div className=" max-w-full ">
          <h2 className="text-xl font-semibold mb-2">Generated README</h2>
            <div className='bg-gray-100 p-3 rounded overflow-auto '>
              <h1>hello</h1>
              <MarkdownViewer content={markdownContent} />
            </div>
          </div>
        </div>
      </div>
      
      </div>
    </div>
  );
}
