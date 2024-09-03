import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import CodeBlock from '@/components/CodeBlock';
import TableOfContents from '@/components/TableOfContents';
import { TOCItem } from '@/components/TableOfContents';

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

export default function MarkDownLoader({
  markdown,
  tocOptions,
}: MarkDownLoaderProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);

  const rehypeTocExtract = () => (tree: any) => {
    const tocItems: TOCItem[] = [];
    tree.children.forEach((node: any) => {
      if (node.type === 'element' && node.tagName[0] === 'h') {
        const level = parseInt(node.tagName[1], 10);
        if (
          level > 1 &&
          (!tocOptions?.maxDepth || level <= tocOptions.maxDepth)
        ) {
          tocItems.push({
            id: node.properties.id,
            title: node.children[0].value,
            level,
          });
        }
      }
    });
    setToc(tocItems);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <ReactMarkdown
          className={`prose mx-2 max-w-[90%] dark:prose-invert`}
          remarkPlugins={[remarkFrontmatter]}
          rehypePlugins={[rehypeSlug, rehypeTocExtract]}
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
      </div>
      {toc.length > 0 && (
        <div className="hidden lg:flex">
          <div className="sticky top-24 max-h-[calc(100vh-10rem)] overflow-y-auto md:col-span-1">
            <TableOfContents toc={toc} />
          </div>
        </div>
      )}
    </div>
  );
}
