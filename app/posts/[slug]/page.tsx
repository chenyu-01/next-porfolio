// app/posts/[slug]/page.tsx
import MarkDownLoader from '@/components/MarkDownLoader';

const PostPage = async ({ params }: { params: { slug: string } }) => {
  return <MarkDownLoader slug={params.slug} />;
};

export default PostPage;
