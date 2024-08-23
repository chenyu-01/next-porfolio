import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 font-bold shadow-md">
        <h1 className="mb-4 text-4xl">
          Hi, I am a Frontend Developer With Vue, React and Typescript
        </h1>
        <div className="flex space-x-4">
          <Button variant={'outline'}>Certificates</Button>
          <Button>Resume</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
