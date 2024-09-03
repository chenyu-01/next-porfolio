import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import ReactIcon from '@/public/images/react.svg';
import VueIcon from '@/public/images/vue.svg';
import TypeScriptIcon from '@/public/images/typescript.svg';
import ProjectsList from '@/components/ProjectList';
import { GetStaticProps } from 'next';
import { getProjects, GithubRepo } from '../lib/projects';
import { ProjectsListProps } from '@/lib/projects';
export const getStaticProps: GetStaticProps<ProjectsListProps> = async () => {
  const { schoolProjects, otherProjects } = await getProjects();
  return {
    props: {
      schoolProjects,
      otherProjects,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
const frontendSkills = [
  'HTML',
  'CSS',
  'JavaScript(ES6+)',
  'TypeScript',
  'React',
  'Vue.js',
  'Vite',
  'Nuxt.js',
  'Next.js',
  'Tailwind CSS',
  'Responsive Design',
];

const backendSkills = [
  'Java',
  'Spring Boot',
  'C#',
  '.NET',
  'Entity Framework',
  'RESTful APIs',
];
const Page = ({ schoolProjects, otherProjects }: ProjectsListProps) => {
  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg p-6 font-bold shadow-lg">
          <h1 className="mb-4 text-3xl md:text-4xl">
            Hi, I am a Full Stack Developer With Vue, React and Java Spring Boot
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
        <h2 className="my-8 text-3xl font-bold md:text-3xl">Skills</h2>
        <p className="my-4">
          I have experience with various technologies and frameworks. Here are
          some of the skills that I have:
        </p>
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
          </TabsList>
          <TabsContent value="frontend">
            <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {frontendSkills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  {skill}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="backend">
            <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {backendSkills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  {skill}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-8 rounded-lg p-6 shadow-xl">
        <h2 className="my-8 text-3xl font-bold md:text-3xl">Projects</h2>
        <ProjectsList
          schoolProjects={schoolProjects}
          otherProjects={otherProjects}
        />
      </div>
    </div>
  );
};

export default Page;
