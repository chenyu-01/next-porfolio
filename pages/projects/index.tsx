import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getProjects, GithubRepo } from '../../lib/projects';

interface ProjectsListProps {
  repos: GithubRepo[];
}

export default function ProjectsList({ repos }: ProjectsListProps) {
  return (
    <section>
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
                    Last Update:{new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-sm">{repo.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const getStaticProps: GetStaticProps<ProjectsListProps> = async () => {
  const repos = await getProjects();
  return {
    props: {
      repos,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
