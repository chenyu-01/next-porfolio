import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg p-6 font-bold shadow-lg">
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
      <div className="mt-8 rounded-lg p-6 shadow-md">
        <h2 className="mb-4 text-3xl font-bold">Skills</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>JavaScript (ES6+)</li>
          <li>TypeScript</li>
          <li>React.js</li>
          <li>Vue.js</li>
          <li>HTML & CSS</li>
          <li>Responsive Design</li>
          <li>Git & GitHub</li>
          <li>RESTful APIs</li>
        </ul>
      </div>
    </div>
  );
};

export default Page;
