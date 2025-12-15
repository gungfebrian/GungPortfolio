import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Redis } from "@upstash/redis";
import { ProjectWrapper } from "./wrapper"; 

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  let views = 0;
  try {
    const redis = Redis.fromEnv();
    views = (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;
  } catch (e) {
    console.warn("Redis connection failed, defaulting views to 0");
  }

  return (
    <ProjectWrapper project={project} views={views} />
  );
}