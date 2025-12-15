import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye, Cpu, Terminal, Activity } from "lucide-react";

export const revalidate = 60;

export default async function ProjectsPage() {
  // 1. Safe View Counting
  let views: Record<string, number> = {};
  try {
    const redis = Redis.fromEnv();
    const viewsData = await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"))
    );
    views = viewsData.reduce((acc, v, i) => {
      acc[allProjects[i].slug] = v ?? 0;
      return acc;
    }, {} as Record<string, number>);
  } catch (e) {
    console.warn("Redis connection failed, defaulting views to 0");
  }

  // 2. SORTING LOGIC (Updated)
  // Logic: "Upcoming" projects go to the bottom. Everything else is Newest First.
  const sortedProjects = allProjects
    .filter((p) => p.published)
    .sort((a, b) => {
      // Check Status First
      const isUpcomingA = a.status === "Upcoming";
      const isUpcomingB = b.status === "Upcoming";

      // If A is Upcoming but B is not, push A down (return 1)
      if (isUpcomingA && !isUpcomingB) return 1;
      // If B is Upcoming but A is not, push B down (return -1)
      if (!isUpcomingA && isUpcomingB) return -1;

      // If both have the same status (both Upcoming or both Normal), sort by Date
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  // 3. SMART FILTERS

  // A. Big Projects
  const bigProjects = sortedProjects.filter((p) => 
    p.slug === "Greenrover" || 
    p.tags?.includes("Big Project") || 
    p.tags?.includes("Feature")
  );

  // B. IoT Projects
  const iotProjects = sortedProjects.filter((p) => 
    !bigProjects.includes(p) && (
      p.tags?.some(tag => ["IoT", "Hardware", "Robotics", "Embedded", "Electronics"].includes(tag)) ||
      p.slug === "skipy" || 
      p.slug === "monsta-can" ||
      p.slug === "dummy-iot"
    )
  );

  // C. Code Projects (Catch-All)
  const codeProjects = sortedProjects.filter((p) => 
    !bigProjects.includes(p) && 
    !iotProjects.includes(p)
  );

  return (
    <div className="relative pb-16 bg-gradient-to-tl from-zinc-900 via-zinc-900 to-black min-h-screen">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
            Project Arsenal
          </h2>
          <p className="mt-4 text-zinc-400">
            A categorized collection of my engineering milestones.
          </p>
        </div>
        
        <div className="w-full h-px bg-zinc-800" />

        {/* 1. Big Projects Section */}
        {bigProjects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 border-l-4 border-green-500 pl-4">
              <Activity className="w-8 h-8 text-green-500" />
              <h3 className="text-2xl font-bold text-zinc-200 font-display">
                  Big Projects
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-8 mx-auto">
              {bigProjects.map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* 2. IoT Section */}
        {iotProjects.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-3 mb-6 border-l-4 border-cyan-500 pl-4">
              <Cpu className="w-8 h-8 text-cyan-500" />
              <h3 className="text-2xl font-bold text-zinc-200 font-display">
                  IoT Elements
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
              {iotProjects.map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* 3. Code Section */}
        {codeProjects.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-3 mb-6 border-l-4 border-purple-500 pl-4">
              <Terminal className="w-8 h-8 text-purple-500" />
              <h3 className="text-2xl font-bold text-zinc-200 font-display">
                  Code Elements
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-8 mx-auto">
              {codeProjects.map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}