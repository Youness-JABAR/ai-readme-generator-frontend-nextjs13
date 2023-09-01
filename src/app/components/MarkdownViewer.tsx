
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {LightAsync} from "react-syntax-highlighter";
import {a11yDark} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import styles from '@/styles/MarkdownViewer.module.css';


interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {


  return (
            <div id='rendered' className='markdown-body'>

            <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex,rehypeStringify]}
            components={{
                code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <LightAsync
                        
                    children={String(children).replace(/\n$/, '')}
                    style={a11yDark}
                    language={match[1]}
                    PreTag="div"
                    />
                ) : (
                    <code {...props} className={className}>
                    {children}
                    </code>
                )
                }
            }}
            />
            </div>
  )
  ;
};

export default MarkdownViewer;
