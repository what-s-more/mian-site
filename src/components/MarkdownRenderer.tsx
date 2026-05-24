import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MarkdownImage from './MarkdownImage';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-gray dark:prose-invert max-w-none
      prose-headings:text-gray-900 dark:prose-headings:text-slate-100
      prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-8
      prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-6
      prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-4
      prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
      prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-gray-100 dark:prose-code:bg-slate-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-gray-900 dark:prose-pre:bg-slate-950 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:overflow-x-auto
      prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 dark:prose-blockquote:border-indigo-400 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400
      prose-ul:text-gray-700 dark:prose-ul:text-slate-300 prose-li:mb-1
      prose-strong:text-gray-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold
      prose-hr:border-gray-200 dark:prose-hr:border-slate-700
      prose-img:rounded-xl prose-img:shadow-md
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt }) => <MarkdownImage src={typeof src === 'string' ? src : ''} alt={alt || ''} />,
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
