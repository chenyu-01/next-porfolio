import path from 'path';
import fs from 'fs';
import Link from 'next/link';
// get list of all markdown files in the posts directory
const postsDirectory = path.join(process.cwd(), 'public', 'posts');
// get list of all markdown filenames and convert to slugs
const filenames = fs.readdirSync(postsDirectory);
const posts = filenames.map((filename) => {
  const slug = filename.replace(/\.md$/, '');
  if (slug === 'index') {
    return;
  }
  return {
    slug,
    filename,
  };
});
export default function RecentPosts() {
  return (
    <div>
      <h1>Recent Posts</h1>
      <ul>
        {posts.map((post) => {
          if (!post) {
            return;
          }
          const slug = post.slug;
          return (
            <li key={slug}>
              <Link href={`/posts/${slug}`}>{slug}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
