// @/app/posts/%5Bslug%5D/MarkDownLoader
import ReactMarkdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import CodeBlock from '@/components/CodeBlock';
export default function MarkDownLoader({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      className={`prose mx-2 max-w-[90%] dark:prose-invert`}
      remarkPlugins={[remarkFrontmatter]}
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
