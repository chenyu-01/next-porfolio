import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ReactIcon from '@/public/images/react.svg';
import VueIcon from '@/public/images/vue.svg';
import TypeScriptIcon from '@/public/images/typescript.svg';
const skills = [
  'HTML',
  'CSS',
  'JavaScript(ES6+)',
  'TypeScript',
  'React',
  'Vite',
  'Vue.js',
  'Git',
  'Nuxt.js',
  'Next.js',
  'Tailwind CSS',
  'RESTful APIs',
  'Responsive Design',
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
      <div className="rounded-lg p-6 shadow-xl">
        <h2 className="my-8 text-4xl font-bold md:text-3xl">Skills</h2>
        <p className="my-4">
          I have experience with various technologies and frameworks. Here are
          some of the skills that I have:
        </p>
        <ul className="grid list-disc grid-cols-1 gap-4 space-y-2 pl-5 text-sm md:grid-cols-2 md:text-xl">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="rounded-full bg-blue-500 px-2 py-1 text-sm text-white dark:bg-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
