"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Eye, Cpu, Terminal, Activity, ArrowUp, Search, X } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [views, setViews] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Fetch views on mount
  useEffect(() => {
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

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // Filter projects by status and search query (SEPARATED LOGIC)
  const filteredProjects = allProjects
    .filter((p) => p.published)
    .filter((p) => {
      // Apply status filter
      if (activeFilter !== "All" && p.status !== activeFilter) return false;

      // Apply search query
      if (!debouncedSearch) return true;
      const query = debouncedSearch.toLowerCase();

      // Format date for search (e.g., "Nov 2025", "2/2/2025", "2025")
      const dateStr = p.date ? new Date(p.date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }).toLowerCase() : '';
      const yearStr = p.date ? new Date(p.date).getFullYear().toString() : '';

      return (
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        dateStr.includes(query) ||
        yearStr.includes(query)
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

  // Total published projects count
  const totalProjects = allProjects.filter((p) => p.published).length;

  // Categorize filtered projects
  const bigProjects = filteredProjects.filter((p) =>
    p.slug === "Greenrover" ||
    p.tags?.includes("Featured") ||
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

        {/* Search Results Count */}
        {(debouncedSearch || activeFilter !== "All") && (
          <div className="text-sm text-zinc-500 -mb-8">
            Showing {filteredProjects.length} of {totalProjects} projects
            {debouncedSearch && ` matching "${debouncedSearch}"`}
            {activeFilter !== "All" && ` (${activeFilter})`}
          </div>
        )}

        {/* Header */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-display mb-4">
            Project Arsenal
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed">
            A categorized collection of my engineering milestones.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-white font-display">{filteredProjects.length}</div>
            <div className="text-xs md:text-sm text-zinc-500 mt-1">Projects</div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-white font-display">
              {Object.values(views).reduce((a, b) => a + b, 0).toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-zinc-500 mt-1">Total Views</div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-white font-display">
              {Array.from(new Set(filteredProjects.flatMap(p => p.tags || []))).length}
            </div>
            <div className="text-xs md:text-sm text-zinc-500 mt-1">Technologies</div>
          </div>
          <div className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-4 text-center cursor-default transition-colors hover:bg-zinc-900/80 hover:border-zinc-700/50">
            <div className="text-3xl md:text-4xl font-bold text-white font-display">
              {filteredProjects[0]?.date
                ? new Date(filteredProjects[0].date).getFullYear()
                : 'N/A'
              }
            </div>
            <div className="relative h-5 mt-1 overflow-hidden">
              <div className="absolute inset-x-0 top-0 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                <div className="text-xs md:text-sm text-zinc-500">Latest</div>
              </div>
              <div className="absolute inset-x-0 top-0 transition-all duration-300 translate-y-full opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">
                <div className="text-xs md:text-sm text-zinc-300 font-medium">
                  {filteredProjects[0]?.date
                    ? `${new Date(filteredProjects[0].date).getDate()}, ${new Date(filteredProjects[0].date).toLocaleString('default', { month: 'long' })}`
                    : ''
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div>
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm text-zinc-500 mr-2 shrink-0 hidden md:inline">Filter:</span>
            <div className="flex gap-2 md:gap-3">
              {['All', 'Completed', 'In Progress', 'Upcoming'].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  aria-pressed={activeFilter === status}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full border transition-all duration-200 shrink-0
                    focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900
                    ${activeFilter === status
                      ? 'bg-white text-zinc-900 border-white'
                      : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* 1. Featured Works Section */}
        {bigProjects.length > 0 && (
          <section id="featured-works" className="animate-fade-in-up scroll-mt-32">
            <div className="flex items-center gap-4 mb-10 group/header">
              <div className="relative">
                <div className="absolute -inset-1 bg-orange-500/20 rounded-xl blur-lg opacity-0 group-hover/header:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-3 rounded-xl border border-orange-500/20 shadow-lg shadow-orange-500/5 group-hover/header:border-orange-400/30 group-hover/header:shadow-orange-500/10 transition-all duration-300">
                  <Activity className="w-5 h-5 text-orange-400 group-hover/header:text-orange-300 transition-all duration-300 group-hover/header:scale-105" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 font-display group-hover/header:text-white transition-colors duration-300">
                Featured Works
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mx-auto">
              {bigProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card>
                    <Article project={project} views={views[project.slug] ?? 0} />
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* 2. IoT Section */}
        {iotProjects.length > 0 && (
          <section id="hardware-iot" className="mt-20 animate-fade-in-up animation-delay-200 scroll-mt-32">
            <div className="flex items-center gap-4 mb-10 group/header">
              <div className="relative">
                <div className="absolute -inset-1 bg-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover/header:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-emerald-500/10 to-green-500/5 p-3 rounded-xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5 group-hover/header:border-emerald-400/30 group-hover/header:shadow-emerald-500/10 transition-all duration-300">
                  <Cpu className="w-5 h-5 text-emerald-400 group-hover/header:text-emerald-300 transition-all duration-300 group-hover/header:scale-105" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-200 font-display group-hover/header:text-zinc-100 transition-colors duration-300">
                Hardware & IoT
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mx-auto">
              {iotProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card>
                    <Article project={project} views={views[project.slug] ?? 0} />
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Code Section */}
        {codeProjects.length > 0 && (
          <section id="software-code" className="mt-20 animate-fade-in-up animation-delay-400 scroll-mt-32">
            <div className="flex items-center gap-4 mb-10 group/header">
              <div className="relative">
                <div className="absolute -inset-1 bg-violet-500/20 rounded-xl blur-lg opacity-0 group-hover/header:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-violet-500/10 to-purple-500/5 p-3 rounded-xl border border-violet-500/20 shadow-lg shadow-violet-500/5 group-hover/header:border-violet-400/30 group-hover/header:shadow-violet-500/10 transition-all duration-300">
                  <Terminal className="w-5 h-5 text-violet-400 group-hover/header:text-violet-300 transition-all duration-300 group-hover/header:scale-105" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-200 font-display group-hover/header:text-zinc-100 transition-colors duration-300">
                Software & Code
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mx-auto">
              {codeProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card>
                    <Article project={project} views={views[project.slug] ?? 0} />
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 space-y-6">
            <p className="text-zinc-400 text-lg mb-4">
              No projects found{debouncedSearch && ` matching "${debouncedSearch}"`}
              {activeFilter !== "All" && ` with status "${activeFilter}"`}
            </p>
            <div className="space-y-3">
              <p className="text-sm text-zinc-500">Try searching for:</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                {Array.from(new Set(allProjects.filter(p => p.published).flatMap(p => p.tags || []))).slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      setActiveFilter("All");
                    }}
                    className="px-3 py-1.5 text-sm rounded-full bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600 hover:text-zinc-100 transition-all
                      focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="mt-6 text-zinc-400 hover:text-zinc-200 underline underline-offset-4 transition-colors
                focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded px-2 py-1"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-500 shadow-lg backdrop-blur-sm z-50
          focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900
          ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}