import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import MarkDownLoader from '@/components/MarkDownLoader';
import { markdownContent } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

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
    revalidate: 10, // enable ISR
  };
};

const PostPage = ({ content }: { content: string }) => {
  return (
    <section>
      <main>
        <MarkDownLoader markdown={content} />
      </main>
    </section>
  );
};

export default PostPage;
