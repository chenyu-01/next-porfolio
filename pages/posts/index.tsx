import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

interface Post {
  slug: string;
  filename: string;
}

interface RecentPostsProps {
  posts: Post[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div>
      <h1>Recent Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
