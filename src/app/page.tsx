import Image from 'next/image'
import ReadmeGenerator from './components/ReadmeGenerator'
import MarkdownViewer from './components/MarkdownViewer';

const markdownContent = `
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
export default function Home() {
  return (
    <>
    <h1>page</h1>
    <ReadmeGenerator/>
    </>
  )
}
