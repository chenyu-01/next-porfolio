// app/posts/[slug]/page.tsx

import MarkDownLoader from '@/components/MarkDownLoader';
import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import TocLinks from '@/components/TocLinks';
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
const PostPage = async ({ params }: { params: { slug: string } }) => {
  const doc = markdownContent(params.slug);
  let mainStyle = 'md:col-span-4 col-span-6';

  // mainStyle = 'col-span-6' // no toc sidebar
  const MainContent = await MarkDownLoader({ markdown: doc }); // JSX.Element
  return (
    <section className="grid grid-cols-6 gap-16">
      <main className={mainStyle}>{MainContent}</main>
      <aside className="col-span-2 hidden md:block">
        <div className="sticky top-8">
          <p className="mb-2 font-semibold">Table of Contents</p>
          <nav>
            {/* <TocLinks
                  :links="doc.body?.toc?.links as tocLink[]"
                  :active-id="activeId"
                  :level="0"
                /> */}
          </nav>
        </div>
      </aside>
    </section>
  );
};

export default PostPage;
