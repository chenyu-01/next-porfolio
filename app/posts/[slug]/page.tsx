// app/posts/[slug]/page.tsx
import React from 'react';
import { Suspense } from 'react';
import type { TocLink } from '@/components/TableOfContents';
import MarkDownLoader from '@/app/posts/[slug]/MarkDownLoader';
import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import TableOfContents from '@/components/TableOfContents';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { visit } from 'unist-util-visit';
const markdownContent = (slug: string) => {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  // check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  if (slug === 'index') {
    redirect('/posts');
  }
  return fs.readFileSync(filePath, 'utf8');
};

const extractTOC = (html: string): TocLink[] => {
  const toc: TocLink[] = [];
  const processor = unified().use(rehypeParse, { fragment: true });
  const ast = processor.parse(html);

  visit(ast, 'element', (node) => {
    if (
      node.tagName === 'h1' ||
      node.tagName === 'h2' ||
      node.tagName === 'h3'
    ) {
      const depth = parseInt(node.tagName[1], 10);
      const id = node.properties.id as string;
      const text = node.children.map((child: any) => child.value).join('');
      toc.push({ id, text, depth });
    }
  });

  return toc;
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const doc = markdownContent(params.slug);
  const { jsx, html } = await MarkDownLoader({ markdown: doc });

  const toc = extractTOC(html);

  // const toc = [] as TocLink[];
  return (
    <Suspense fallback={<div>loading...</div>}>
      <section className="grid grid-cols-6 gap-16">
        <main
          className={toc.length > 0 ? 'col-span-6 md:col-span-4' : 'col-span-6'}
        >
          {jsx}
        </main>
        <aside className="col-span-2 hidden md:block">
          <div className="sticky top-8">
            <p className="mb-2 font-semibold">Table of Contents</p>
            <nav>{toc.length > 0 && <TableOfContents links={toc} />}</nav>
          </div>
        </aside>
      </section>
    </Suspense>
  );
};

export default PostPage;
