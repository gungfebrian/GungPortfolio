import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye, Cpu, Globe, Terminal, Activity } from "lucide-react";

// Optional: Comment out Redis if you don't have it set up yet to avoid build errors
// const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  const views: Record<string, number> = {}; // Redis logic commented out

  // Filter projects by category
  const bigProjects = allProjects.filter((p) => p.slug === "Greenrover");
  const iotProjects = allProjects.filter((p) => p.slug === "skipy" || p.slug === "monsta-can");
  const codeProjects = allProjects.filter((p) => p.slug === "pcv" || p.slug === "quiz-bowl"); 

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

        {/* Category 1: Big Projects */}
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

        {/* Category 2: IoT Elements */}
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

        {/* Category 3: Code Elements */}
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

      </div>
    </div>
  );
}