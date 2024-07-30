import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import MarkDownLoader from '@/components/MarkDownLoader';
import TableOfContents, { TOCItem } from '@/components/TableOfContents';
import generateTOC from '@/lib/toc';
import fs from 'fs';
import path from 'path';
const postsDirectory = path.join(process.cwd(), 'public', 'posts');

const markdownContent = (slug: string) => {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  // check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const content = markdownContent(slug);
  const toc = generateTOC(content);
  return {
    props: {
      content,
      toc,
    },
    revalidate: 10, // enable ISR
  };
};

const PostPage = ({ content, toc }: { content: string; toc: TOCItem[] }) => {
  return (
    <section className="grid grid-cols-6 gap-16">
      <main
        className={toc.length > 0 ? 'col-span-6 md:col-span-4' : 'col-span-6'}
      >
        <MarkDownLoader markdown={content} />
      </main>
      {toc.length > 0 && <TableOfContents toc={toc} />}
    </section>
  );
};

export default PostPage;
