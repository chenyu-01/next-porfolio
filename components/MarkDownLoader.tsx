import ReactMarkdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import CodeBlock from '@/components/CodeBlock';

interface MarkDownLoaderProps {
  markdown: string;
  tocOptions?: {
    heading?: string;
    maxDepth?: number;
    tight?: boolean;
    ordered?: boolean;
    prefix?: string;
  };
}

export default function MarkDownLoader({ markdown }: MarkDownLoaderProps) {
  return (
    <ReactMarkdown
      className={`prose mx-2 max-w-[90%] dark:prose-invert`}
      remarkPlugins={[remarkFrontmatter]}
      rehypePlugins={[rehypeSlug]}
      components={{
        pre: ({ children }) => (
          <pre className="not-prose overflow-x-hidden">{children}</pre>
        ),
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          return match ? (
            <CodeBlock
              language={language}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code
              className={`not-prose rounded bg-slate-300 px-1 text-xs italic text-slate-800 ${className}`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
