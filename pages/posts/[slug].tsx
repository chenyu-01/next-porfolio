import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import MarkDownLoader from '@/components/MarkDownLoader';
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

  return {
    props: {
      content,
    },
  };
};

const PostPage = ({ content }: { content: string }) => {
  return (
    <section className="grid grid-cols-6 gap-16">
      <main className={'col-span-6 md:col-span-4'}>
        <MarkDownLoader markdown={content} />
      </main>
      {/* <aside className="col-span-2 hidden md:block">
        <div className="sticky top-8">
          <p className="mb-2 font-semibold">Table of Contents</p>
          <nav>{toc.length > 0 && <TableOfContents links={toc} />}</nav>
        </div>
      </aside> */}
    </section>
  );
};

export default PostPage;
