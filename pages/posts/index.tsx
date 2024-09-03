import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Post {
  slug: string;
  filename: string;
  // Add more fields as needed, e.g., title, excerpt, date
}

interface RecentPostsProps {
  posts: Post[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Recent Posts</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>{post.slug}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add more content here, e.g., excerpt, date */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
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
