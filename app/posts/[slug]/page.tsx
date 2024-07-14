// app/posts/[slug]/page.tsx
import ReactMarkdown from 'react-markdown';
import { loader } from '@/app/posts/slug.loader';

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const markdown = await loader({ slug: params.slug });
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

export default PostPage;
