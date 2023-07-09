const token = process.env.PAT;

export async function fetchByGitHubAPI(url: string) {
  if (token === undefined) {
    throw new Error("PAT is undefined");
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: {
      revalidate: 60 * 60 * 24, // 1day
    },
  });

  return res.json();
}
