// app/posts/[slug]/page.tsx
import MarkDownLoader from '@/components/MarkDownLoader';
import TocLinks from '@/components/TocLinks';
const PostPage = async ({ params }: { params: { slug: string } }) => {
  const doc = await MarkDownLoader({ slug: params.slug });
  let mainStyle = 'md:col-span-4 col-span-6';
  // mainStyle = 'col-span-6' // no toc sidebar
  return (
    <section className="grid grid-cols-6 gap-16">
      <main className={mainStyle}>{doc}</main>
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
