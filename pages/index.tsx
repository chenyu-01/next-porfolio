import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 font-bold shadow-md">
          <h1 className="mb-4 text-4xl">
            Hi, I am a Frontend Developer With Vue, React and Typescript
          </h1>
          <div className="flex space-x-4">
            <Button variant={'outline'}>Certificates</Button>
            <Button>Resume</Button>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg p-6">
          <div className="flex flex-wrap space-x-4 space-y-4">
            <Image
              src="/images/typescript.svg"
              alt="TypeScript"
              width={128}
              height={128}
            />
            <Image
              src="/images/react.svg"
              alt="React.js"
              width={128}
              height={128}
            />
            <Image
              src="/images/vue.svg"
              alt="Vue.js"
              width={128}
              height={128}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
