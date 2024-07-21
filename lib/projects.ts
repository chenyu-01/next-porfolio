// lib/projects.ts

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};

export async function getProjects(): Promise<GithubRepo[]> {
  const response = await fetch('https://api.github.com/users/chenyu-01/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch repos');
  }

  const allRepos = (await response.json()) as GithubRepo[];
  // sort by last commit time
  return allRepos
    .filter((repo) => !repo.fork)
    .sort((a, b) => {
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });
}
