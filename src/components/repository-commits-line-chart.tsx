import { fetchByGitHubAPI } from "@/lib";
import { Card, Title, LineChart } from "@tremor/react";
import { subDays, format } from "date-fns";

export async function RepositoryCommitsLineChart() {
  const { repos, recentCommits } = await fetchRepositoryCommits();

  return (
    <Card>
      <Title>Repository commits</Title>
      <LineChart
        className="mt-6"
        data={recentCommits}
        index="day"
        categories={repos.map((repo: { name: string }) => repo.name)}
      />
    </Card>
  );
}

async function fetchRepositoryCommits() {
  const repos = await fetchByGitHubAPI(
    "https://api.github.com/user/repos?type=owner&sort=updated&per_page=5"
  );

  const commits = await Promise.all(
    repos.map(async (repo: { commits_url: string; name: string }) => {
      const commits = await fetchByGitHubAPI(
        repo.commits_url.replaceAll("{/sha}", "")
      );

      const commitDateList = commits.map(
        (item: { commit: { author: { date: string } } }) =>
          format(new Date(item.commit.author.date), "yyyy-MM-dd")
      );

      return { repoName: repo.name, commitDateList };
    })
  );

  const today = new Date();

  const recentCommits = [...Array(30)]
    .map((_, i) => i)
    .map((i) => {
      const targetDate = subDays(today, i);

      const repoListObj = commits.reduce(
        (accumulator: any, currentValue: any) => {
          let count = 0;

          currentValue.commitDateList.forEach((commit: string) => {
            if (commit === format(targetDate, "yyyy-MM-dd")) {
              count = count + 1;
            }
          });

          return {
            ...accumulator,
            [currentValue.repoName]: count,
          };
        },
        {}
      );

      return { day: format(targetDate, "MM-dd"), ...repoListObj };
    })
    .reverse();

  return {
    repos,
    recentCommits,
  };
}
