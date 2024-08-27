import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ReactIcon from '@/public/images/react.svg';
import VueIcon from '@/public/images/vue.svg';
import TypeScriptIcon from '@/public/images/typescript.svg';
const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vite',
  'Vue.js',
  'Git',
  'Nuxt.js',
  'Next.js',
  'Tailwind CSS',
];
const Page = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg p-6 font-bold shadow-lg">
          <h1 className="mb-4 md:text-4xl">
            Hi, I am a Frontend Developer With Vue, React and Typescript
          </h1>
          <div className="flex space-x-4">
            <Button variant={'outline'}>Certificates</Button>
            <Button>Resume</Button>
          </div>
        </div>
        <div className="hidden items-center justify-center rounded-lg p-6 sm:mx-20 sm:flex md:mx-0">
          <div className="grid w-full grid-cols-3 gap-4">
            {[
              { icon: TypeScriptIcon, alt: 'TypeScript' },
              { icon: ReactIcon, alt: 'React.js' },
              { icon: VueIcon, alt: 'Vue.js' },
            ].map(({ icon, alt }, index) => (
              <div key={index} className="aspect-square w-full">
                <Image
                  src={icon}
                  alt={alt}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-lg p-6 shadow-xl">
        <h2 className="mb-4 font-bold md:text-3xl">Skills</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm md:text-xl">
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
