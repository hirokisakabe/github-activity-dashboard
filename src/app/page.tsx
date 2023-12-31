import { Header, RepositoryCommitsLineChart } from "@/components";
import { Title } from "@tremor/react";

export default function Home() {
  return (
    <div>
      <div className="px-3 py-1">
        <Header />
      </div>
      <main className="px-3 py-1">
        <RepositoryCommitsLineChart />
      </main>
    </div>
  );
}
