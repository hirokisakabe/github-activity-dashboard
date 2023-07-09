import { RepositoryCommitsLineChart } from "@/components";
import { Title } from "@tremor/react";

export default function Home() {
  return (
    <div>
      <div className="px-3 py-1">
        <div className="pt-3">
          <div className="w-full">
            <Title>GitHub Activity Dashboard</Title>
          </div>
        </div>
      </div>
      <main className="px-3 py-1">
        <RepositoryCommitsLineChart />
      </main>
    </div>
  );
}
