import { fetchByGitHubAPI } from "@/lib";
import { Title, Text } from "@tremor/react";
import Image from "next/image";

export async function Header() {
  const { name, avatar_url } = await fetchUser();

  return (
    <div className="pt-3 flex justify-between">
      <div className="">
        <Title>GitHub Activity Dashboard</Title>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center">
          <Image
            className="h-8 w-8 rounded-full"
            src={avatar_url}
            width={100}
            height={100}
            alt="user icon img"
          />
          <Text className="px-2">{name}</Text>
        </div>
      </div>
    </div>
  );
}
async function fetchUser() {
  const user = await fetchByGitHubAPI("https://api.github.com/user");

  return { name: user.name, avatar_url: user.avatar_url };
}
