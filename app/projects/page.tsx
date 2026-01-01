"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Eye, Cpu, Terminal, Activity, ArrowUp, Search, X } from "lucide-react";

export default function ProjectsPage() {
  const [views, setViews] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch views on mount
  useEffect(() => {
    setIsLoaded(true);
    async function fetchViews() {
      try {
        const response = await fetch('/api/views');
        if (response.ok) {
          const data = await response.json();
          setViews(data);
        }
      } catch (error) {
        console.warn("Failed to fetch views");
      }
    }
    fetchViews();
  }, []);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter projects by search query
  const filteredProjects = allProjects
    .filter((p) => p.published)
    .filter((p) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    })
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

  // Categorize filtered projects
  const bigProjects = filteredProjects.filter((p) =>
    p.slug === "Greenrover" ||
    p.tags?.includes("Big Project") ||
    p.tags?.includes("Feature")
  );

  const iotProjects = filteredProjects.filter((p) =>
    !bigProjects.includes(p) && (
      p.tags?.some(tag => ["IoT", "Hardware", "Robotics", "Embedded", "Electronics"].includes(tag)) ||
      p.slug === "skipy" ||
      p.slug === "monsta-can" ||
      p.slug === "dummy-iot"
    )
  );

  const codeProjects = filteredProjects.filter((p) =>
    !bigProjects.includes(p) &&
    !iotProjects.includes(p)
  );

  return (
    <div className="relative pb-16 bg-gradient-to-tl from-zinc-900 via-zinc-900 to-black min-h-screen">
      <Navigation showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="px-6 pt-20 mx-auto space-y-12 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">

        {/* Header */}
        <div className={`max-w-2xl mx-auto lg:mx-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display mb-4">
            Project Arsenal
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            A categorized collection of my engineering milestones.
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* 1. Featured Works Section */}
        {bigProjects.length > 0 && (
          <section id="featured-works" className="animate-fade-in-up scroll-mt-32">
            <div className="flex items-center gap-4 mb-10 group/header">
              <div className="relative">
                <div className="absolute -inset-1 bg-amber-500/20 rounded-xl blur-lg opacity-0 group-hover/header:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-3 rounded-xl border border-amber-500/20 shadow-lg shadow-amber-500/5 group-hover/header:border-amber-400/40 group-hover/header:shadow-amber-500/10 transition-all duration-500">
                  <Activity className="w-5 h-5 text-amber-400 group-hover/header:text-amber-300 transition-all duration-500 group-hover/header:scale-110" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 font-display group-hover/header:text-white transition-colors duration-500">
                Featured Works
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
          <section id="hardware-iot" className="mt-16 animate-fade-in-up animation-delay-200 scroll-mt-32">
            <div className="flex items-center gap-4 mb-8 group/header">
              <div className="relative">
                <div className="absolute -inset-1 bg-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover/header:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-3 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5 group-hover/header:border-cyan-400/40 group-hover/header:shadow-cyan-500/10 transition-all duration-500">
                  <Cpu className="w-5 h-5 text-cyan-400 group-hover/header:text-cyan-300 transition-all duration-500 group-hover/header:scale-110" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-200 font-display group-hover/header:text-zinc-100 transition-colors duration-500">
                Hardware & IoT
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
          <section id="software-code" className="mt-16 animate-fade-in-up animation-delay-400 scroll-mt-32">
            <div className="flex items-center gap-4 mb-8 group/header">
              <div className="relative">
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-xl blur-lg opacity-0 group-hover/header:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/5 p-3 rounded-xl border border-indigo-500/20 shadow-lg shadow-indigo-500/5 group-hover/header:border-indigo-400/40 group-hover/header:shadow-indigo-500/10 transition-all duration-500">
                  <Terminal className="w-5 h-5 text-indigo-400 group-hover/header:text-indigo-300 transition-all duration-500 group-hover/header:scale-110" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-200 font-display group-hover/header:text-zinc-100 transition-colors duration-500">
                Software & Code
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

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No projects found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-zinc-400 hover:text-zinc-200 underline underline-offset-4"
            >
              Clear search
            </button>
          </div>
        )}

      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-500 shadow-lg backdrop-blur-sm z-50 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}