import path from 'path';
import fs from 'fs';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      if (slug === 'index') {
        return null;
      }
      return {
        slug,
        filename,
      };
    })
    .filter(Boolean); // This removes any null entries

  return posts;
}
