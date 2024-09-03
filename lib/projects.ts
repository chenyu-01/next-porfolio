// lib/projects.ts

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
  topics: string[];
};
export interface ProjectsListProps {
  schoolProjects: GithubRepo[];
  otherProjects: GithubRepo[];
}
export async function getProjects(): Promise<{
  schoolProjects: GithubRepo[];
  otherProjects: GithubRepo[];
}> {
  const response = await fetch('https://api.github.com/users/chenyu-01/repos', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch repos');
  }

  const allRepos = (await response.json()) as GithubRepo[];

  // Filter and sort repos
  const schoolProjects = allRepos
    .filter((repo) => !repo.fork && repo.topics.includes('school-project'))
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

  const otherProjects = allRepos
    .filter((repo) => !repo.fork && !repo.topics.includes('school-project'))
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

  return { schoolProjects, otherProjects };
}
