import path from 'path';
import fs from 'fs';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      if (slug === 'index' || slug === 'about') {
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
export const markdownContent = (slug: string) => {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  // check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
};
