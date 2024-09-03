import Link from 'next/link';
import { GithubRepo } from '@/lib/projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProjectsListProps } from '@/lib/projects';

function ProjectList({ repos }: { repos: GithubRepo[] }) {
  return (
    <ul>
      {repos.map((repo) => (
        <li
          key={repo.id}
          className="my-2 rounded-sm border p-2 font-mono hover:border-green-200 hover:bg-green-50 dark:hover:bg-black"
        >
          <Link href={repo.html_url}>
            <div className="flex items-center justify-between text-lg">
              <div className="font-semibold">{repo.name}</div>
              <div className="flex flex-col justify-end">
                <p className="self-end">{repo.stargazers_count} ⭐</p>
                <span>
                  Last Update: {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p className="text-sm">{repo.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectsList({
  schoolProjects,
  otherProjects,
}: ProjectsListProps) {
  return (
    <section>
      <Tabs defaultValue="school" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="school">School Projects</TabsTrigger>
          <TabsTrigger value="other">Other Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="school">
          <ProjectList repos={schoolProjects} />
        </TabsContent>
        <TabsContent value="other">
          <ProjectList repos={otherProjects} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
