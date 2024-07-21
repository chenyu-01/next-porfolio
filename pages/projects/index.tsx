import Link from 'next/link';

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};

async function ProjectsList() {
  const response = await fetch('https://api.github.com/users/chenyu-01/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch repos');
  }

  const allRepos = (await response.json()) as GithubRepo[];
  // sort by last commit time
  const repos = allRepos
    .filter((repo) => !repo.fork)
    .sort((a, b) => {
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });
  return (
    <section>
      <ul>
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="my-2 rounded-sm border p-2 font-mono hover:border-green-200 hover:bg-green-50 dark:hover:bg-black"
          >
            <Link href={repo.html_url}>
              <div className="flex items-center justify-between text-sm">
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
export default ProjectsList;
