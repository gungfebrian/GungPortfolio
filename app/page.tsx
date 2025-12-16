"use client";
import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { Card } from "./components/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Activity, 
  Globe, 
  Download,
  Terminal, 
  Home as HomeIcon, 
  User, 
  Briefcase, 
  Code2, 
  Mail 
} from "lucide-react";

// Navigation with Icons for Mobile
const navigation = [
  { name: "Home", href: "#home", icon: <HomeIcon className="w-5 h-5" /> },
  { name: "About", href: "#about", icon: <User className="w-5 h-5" /> },
  { name: "Experience", href: "#experience", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Projects", href: "/projects", icon: <Code2 className="w-5 h-5" /> },
  { name: "Contact", href: "/contact", icon: <Mail className="w-5 h-5" /> },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-screen overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black scroll-smooth">
      
      {/* --- NAVIGATION (Hybrid: Icons on Mobile, Text on Desktop) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 animate-fade-in border-b border-white/5 md:border-none bg-black/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none transition-all duration-300">
        <div className="flex items-center justify-center py-4 md:py-8 px-4 md:px-0">
          <ul className="flex items-center gap-4 md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center justify-center"
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {/* Mobile View: Icon Bubble */}
                <span className="md:hidden p-2.5 rounded-full bg-zinc-800/50 text-zinc-400 group-hover:text-white group-hover:bg-zinc-700 transition-all border border-transparent group-hover:border-zinc-600">
                  {item.icon}
                </span>

                {/* Desktop View: Text */}
                <span className="hidden md:block text-sm font-medium duration-500 text-zinc-500 hover:text-zinc-200">
                  {item.name}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="flex flex-col items-center justify-center w-full h-screen relative pt-20 md:pt-0">
        <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 absolute top-1/3 animate-fade-left animate-glow" />
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
           
           {/* Fixed Badge: Wraps text on mobile to prevent overflow */}
           <div className="inline-flex flex-wrap justify-center items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2 mb-8 animate-fade-in mx-auto max-w-[90vw]">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></span>
              <span className="text-xs text-zinc-400 text-center leading-tight">
                Computer Engineering Student <span className="hidden sm:inline">|</span> <br className="sm:hidden"/> AI & Embedded Systems
              </span>
            </div>

          <h1 className="py-2 text-5xl sm:text-7xl md:text-9xl text-transparent duration-1000 bg-white cursor-default text-edge-outline font-display whitespace-nowrap bg-clip-text animate-title drop-shadow-2xl">
            Gung Febrian
          </h1>
          
          <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 my-8 animate-fade-right animate-glow" />
          
          <h2 className="text-base md:text-lg text-zinc-400 mx-auto max-w-2xl px-4 animate-fade-in leading-relaxed">
            Leading with vision. Building with 
             <span className="text-zinc-200 font-semibold block md:inline"> precision.</span>
          </h2>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="w-full py-12 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full mt-12 md:mt-0">
          
          {/* Photo Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[500px] md:h-[650px] flex flex-col justify-end translate-y-6 md:translate-y-12 rounded-2xl overflow-hidden md:rounded-none md:overflow-visible"
          >
             <Image 
                src="/Untitled.png" 
                alt="Gung Febrian"
                fill
                className="object-cover object-top"
                priority
             />
             <div className="transparent opacity-90" />
             
             <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white font-display drop-shadow-lg">Gung Febrian</h3>
                <p className="text-zinc-300 drop-shadow-md text-base md:text-lg mb-4">ITS 23 - Computer Engineer </p>
                <div className="w-24 h-1 bg-white rounded-full"></div>
             </div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-8">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 font-display mb-6">
                The Hybrid Mindset
                </h2>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                I don't just write code, I lead movements. My philosophy is built on the intersection of three pillars: technical expertise, physical discipline, and global leadership.
                </p>
                <Link 
                  href="/resume.pdf" 
                  target="_blank"
                  className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-transparent border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 hover:bg-zinc-900 transition-all duration-300"
                >
                  <span className="text-sm font-medium">Download CV</span>
                  {/* Download Icon */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 transition-transform group-hover:translate-y"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" x2="12" y1="15" y2="3"/>
                  </svg>
                </Link>
            </motion.div>
            
            <div className="space-y-4">
              <Card>
                <div className="flex gap-4 p-4 items-start">
                  <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200 shrink-0">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Engineering & Systems</h3>
                    <p className="text-sm text-zinc-400">I build end to end solutions: software, IoT, and data driven prototypes.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex gap-4 p-4 items-start">
                  <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200 shrink-0">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Execution & Discipline</h3>
                    <p className="text-sm text-zinc-400">Consistent iteration, measurable progress, and strong habits on and off the screen.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex gap-4 p-4 items-start">
                  <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200 shrink-0">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Global Leader</h3>
                    <p className="text-sm text-zinc-400">Comfortable leading, supporting, and coordinating across diverse teams.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      

      {/* --- BEYOND THE CODE --- */}
      <section id="experience" className="w-full py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-100 font-display">
            Beyond the Code
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
            Technical skills build products, but leadership builds legacies. Here is how I drive impact outside the terminal.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
               <div className="md:w-1/4">
                  <span className="text-zinc-500 font-mono text-sm">Upcoming 2026</span>
                  <h3 className="text-xl font-bold text-zinc-200 mt-1 font-display">Cohort</h3>
                  <p className="text-zinc-400 text-sm">Apple Developer Academy</p>
               </div>
               <div className="md:w-3/4 border-l border-zinc-800 pl-6 md:pl-8">
               <p className="text-zinc-400 text-sm leading-relaxed">
                Admitted to the Apple Developer Academy program, focusing on end-to-end iOS product development using Swift and SwiftUI. The program emphasizes design thinking, collaboration, and building real-world applications across the full product lifecycle within the Apple ecosystem.
                  </p>
               </div>
            </div>
          </Card>

         {/* AIESEC Card */}
         <Card>
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
               <div className="md:w-1/4 shrink-0">
                  <span className="text-zinc-500 font-mono text-sm">Internarional Relations</span>
                  <h3 className="text-xl font-bold text-zinc-200 mt-1 font-display">Team Member</h3>
                  <p className="text-zinc-400 text-sm">AIESEC</p>
               </div>
               <div className="md:w-3/4 border-l border-zinc-800 pl-6 md:pl-8">
                  <ul className="list-disc list-outside text-zinc-400 space-y-2 text-sm">
                  <li>Facilitated international partnerships within the External Relations division.</li>
                    <li>Managed cross-cultural communications with diverse global stakeholders.</li>
                    <li>Executed social impact projects to drive community engagement.</li>
                  </ul>
               </div>
            </div>
          </Card>

          {/* TEDx Card */}
          <Card>
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
               <div className="md:w-1/4 shrink-0">
                  <span className="text-zinc-500 font-mono text-sm">Organizer</span>
                  <h3 className="text-xl font-bold text-zinc-200 mt-1 font-display">Internal Relations</h3>
                  <p className="text-zinc-400 text-sm">TEDxITS</p>
               </div>
               <div className="md:w-3/4 border-l border-zinc-800 pl-6 md:pl-8">
                  <ul className="list-disc list-outside text-zinc-400 space-y-2 text-sm">
                  <li>Streamlined communication between speaker, production, and logistics teams.</li>
                    <li>Ensured operational synergy for the seamless execution of large-scale events.</li>
                    <li>Managed internal resources and schedules under strict timelines.</li>
                  </ul>
               </div>
            </div>
          </Card>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full py-12 text-center border-t border-zinc-900 bg-zinc-950">
         <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-zinc-100 font-display mb-4">Ready to Collaborate?</h2>
            <div className="flex justify-center gap-4 mb-8">
               <Link href="/contact" className="px-6 py-2 bg-zinc-100 text-zinc-900 font-medium rounded hover:bg-zinc-200 transition-colors">
                  Contact Me
               </Link>
               <Link href="/projects" className="px-6 py-2 border border-zinc-700 text-zinc-300 font-medium rounded hover:border-zinc-500 transition-colors">
                  View Projects
               </Link>
            </div>
            <p className="text-zinc-600 text-xs">
               © 2025 Gung Febrian.
            </p>
         </div>
      </footer>

    </div>
  );
}