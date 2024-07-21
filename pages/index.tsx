import Layout from '@/components/layout';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>;
};
Page.getLayout = (page) => <Layout>{page}</Layout>;
export default Page;
