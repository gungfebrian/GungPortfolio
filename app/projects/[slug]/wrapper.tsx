"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Github, 
  Link as LinkIcon, 
  Eye, 
  ArrowLeft, 
  Layers, 
  Code, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Monitor,
  Cpu,
  ArrowUpRight
} from "lucide-react";
import { Mdx } from "@/app/components/mdx";
import { ReportView } from "./view";

type Props = {
  project: {
    slug: string;
    title: string;
    description: string;
    date?: string;
    url?: string;
    repository?: string;
    image?: string;
    tags?: string[]; 
    // --- ADDED THIS LINE ---
    platform?: string;
    // ----------------------
    status?: "Completed" | "In Progress" | "Upcoming"; // Added status type for safety
    body: { code: string };
  };
  views: number;
};

export function ProjectWrapper({ project, views }: Props) {
  const [activeTab, setActiveTab] = useState<"story" | "blueprint" | "visuals">("story");
  
  // Gallery Logic
  const images = project.image ? [project.image] : []; 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Status Logic
  // We check if the project has a status, otherwise default to "Completed"
  const status = project.status || "Completed"; 
  
  const statusStyles = {
      "Completed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
      "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
      "Upcoming": "bg-zinc-800/50 text-zinc-400 border-zinc-700 shadow-none"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 md:bg-black/80 backdrop-blur-md p-0 md:p-6 animate-in fade-in duration-300">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {project.image && (
             <Image
             src={project.image}
             alt="bg"
             fill
             className="object-cover opacity-20 blur-3xl scale-125"
           />
        )}
      </div>

      <ReportView slug={project.slug} />

      {/* THE MAIN BOX */}
      <div className="relative z-10 w-full max-w-6xl h-full md:h-[90vh] bg-zinc-950 border-x md:border border-zinc-800 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
        
        {/* Internal Header */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-xl p-4 shrink-0 gap-4 md:gap-0 z-20">
            <div className="flex items-center gap-4 w-full md:w-auto">
                 <Link 
                    href="/projects" 
                    className="group flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all border border-zinc-700/50"
                 >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                 </Link>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Project</span>
                    <span className="font-bold text-zinc-100 truncate max-w-[200px] md:max-w-xs text-lg font-display">
                        {project.title}
                    </span>
                 </div>
            </div>

            {/* Tabs */}
            <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
                <div className="flex items-center p-1 bg-zinc-950/50 border border-zinc-800 rounded-full shadow-inner min-w-max mx-auto md:mx-0">
                    <TabButton active={activeTab === "story"} onClick={() => setActiveTab("story")} icon={<Layers className="w-4 h-4" />} label="Overview" />
                    <TabButton active={activeTab === "blueprint"} onClick={() => setActiveTab("blueprint")} icon={<Code className="w-4 h-4" />} label="The Blueprint" />
                    <TabButton active={activeTab === "visuals"} onClick={() => setActiveTab("visuals")} icon={<ImageIcon className="w-4 h-4" />} label="Visuals" />
                </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
                 {project.repository && (
                    <Link target="_blank" href={`https://github.com/${project.repository}`} className="p-2.5 text-zinc-400 hover:text-white transition-colors" title="View Code">
                        <Github className="w-5 h-5" />
                    </Link>
                 )}
                 {project.url && (
                    <Link target="_blank" href={project.url} className="px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                        Visit Site <LinkIcon className="w-3 h-3" />
                    </Link>
                 )}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-zinc-950 relative">
            
            {/* TAB 1: THE STORY */}
            {activeTab === "story" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative h-[35vh] md:h-[50vh] w-full overflow-hidden group">
                        {project.image ? (
                             <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
                        ) : (
                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 font-mono">No Cover Image</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                             <h1 className="text-4xl md:text-7xl font-bold text-white font-display mb-4 drop-shadow-2xl tracking-tight">
                                {project.title}
                             </h1>
                             <div className="flex items-center gap-6 text-zinc-300 font-mono text-xs md:text-sm">
                                <span className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-zinc-500" /> {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)} Views
                                </span>
                                {project.date && (
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-zinc-500" /> {new Date(project.date).getFullYear()}
                                    </span>
                                )}
                             </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto p-6 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-gradient-to-b from-white to-transparent rounded-full"></span> The Mission
                                </h3>
                                <p className="text-lg text-zinc-400 leading-relaxed font-light">{project.description}</p>
                                
                                <div className="mt-8 pt-8 border-t border-zinc-900 md:hidden grid grid-cols-2 gap-3">
                                     {project.url && (
                                        <Link href={project.url} className="flex items-center justify-center gap-2 py-3 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-sm">
                                            <LinkIcon className="w-4 h-4" /> Live Demo
                                        </Link>
                                     )}
                                     {project.repository && (
                                        <Link href={`https://github.com/${project.repository}`} className="flex items-center justify-center gap-2 py-3 rounded-lg bg-zinc-900 text-white border border-zinc-800 font-medium text-sm">
                                            <Github className="w-4 h-4" /> Source Code
                                        </Link>
                                     )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                                    <span className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Project Status</span>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${statusStyles[status]}`}>
                                        <span className="relative flex h-2 w-2">
                                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === "Completed" ? "bg-emerald-400" : status === "In Progress" ? "bg-blue-400" : "bg-zinc-400"}`}></span>
                                          <span className={`relative inline-flex rounded-full h-2 w-2 ${status === "Completed" ? "bg-emerald-500" : status === "In Progress" ? "bg-blue-500" : "bg-zinc-500"}`}></span>
                                        </span>
                                        {status}
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                                    <span className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Platform</span>
                                    <div className="flex items-center gap-2 text-zinc-200 font-medium">
                                        <Monitor className="w-4 h-4 text-zinc-400" /> 
                                        {/* Use the dynamic platform value, or default to Web/IoT */}
                                        {project.platform || "Web / IoT"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: THE BLUEPRINT */}
            {activeTab === "blueprint" && (
                <div className="max-w-4xl mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    
                    {/* Tech Stack & Repo Card Header */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        
                        {/* Access Code Card */}
                        {project.repository ? (
                            <Link 
                                href={`https://github.com/${project.repository}`}
                                target="_blank"
                                className="group relative p-6 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 rounded-2xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Github className="w-24 h-24" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2 text-zinc-100">
                                        <Github className="w-6 h-6" />
                                        <span className="font-bold text-lg">Repository</span>
                                    </div>
                                    <p className="text-zinc-400 text-sm mb-4">Explore the source code, commit history, and technical documentation.</p>
                                    <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:underline underline-offset-4">
                                        View on GitHub <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500">
                                <span className="flex items-center gap-2"><Github className="w-5 h-5" /> Private Repository</span>
                            </div>
                        )}

                        {/* Tech Stack Summary */}
                        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
                             <div className="flex items-center gap-3 mb-4 text-zinc-100">
                                <Cpu className="w-6 h-6" />
                                <span className="font-bold text-lg">Technologies</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tags?.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700">
                                        {tag}
                                    </span>
                                )) ?? (
                                    <>
                                        <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700">Next.js</span>
                                        <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700">TypeScript</span>
                                        <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700">Tailwind</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 pb-4 border-b border-zinc-800">
                        <h2 className="text-3xl font-display font-bold text-zinc-100">Technical Deep Dive</h2>
                    </div>
                    
                    <article className="prose prose-zinc prose-invert prose-quoteless w-full max-w-none">
                        <Mdx code={project.body.code} />
                    </article>
                </div>
            )}

            {/* TAB 3: VISUALS */}
            {activeTab === "visuals" && (
                <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-300 p-4">
                    {images.length > 0 ? (
                        <div className="flex-1 relative flex items-center justify-center bg-zinc-900/50 rounded-2xl border border-zinc-800/50 overflow-hidden group">
                            <Image src={images[currentImageIndex]} alt="Gallery" fill className="object-contain" />
                            {images.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/80 backdrop-blur-md transition-all active:scale-95"><ChevronLeft className="w-6 h-6" /></button>
                                    <button onClick={nextImage} className="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/80 backdrop-blur-md transition-all active:scale-95"><ChevronRight className="w-6 h-6" /></button>
                                    <div className="absolute bottom-6 px-4 py-2 bg-black/70 rounded-full text-xs text-zinc-300 backdrop-blur-md border border-white/10">{currentImageIndex + 1} / {images.length}</div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4"><ImageIcon className="w-12 h-12 opacity-20" /><p>No additional images available.</p></div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${active ? "bg-zinc-800 text-white shadow-lg shadow-black/50 ring-1 ring-white/10" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"}`}>
            {icon} <span>{label}</span>
        </button>
    );
}