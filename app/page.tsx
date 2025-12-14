"use client";
import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { Cpu, Activity, Globe, Terminal } from "lucide-react";
import { Card } from "./components/card";
import Image from "next/image";
import { motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-screen overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black scroll-smooth">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 my-8 backdrop-blur-sm animate-fade-in">
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium duration-500 text-zinc-500 hover:text-zinc-200"
              onClick={(e) => {
                if (item.href.startsWith("#")) {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center w-full h-screen relative">
        <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 absolute top-1/3 animate-fade-left animate-glow" />
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <div className="z-10 text-center px-4">
           <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-zinc-400">Computer Engineering Student | AI & Embedded Systems</span>
            </div>
          <h1 className="py-2 text-5xl text-transparent duration-1000 bg-white cursor-default text-edge-outline font-display sm:text-7xl md:text-9xl whitespace-nowrap bg-clip-text animate-title">
            Gung Febrian
          </h1>
          <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 my-8 animate-fade-right animate-glow" />
          <h2 className="text-base text-zinc-400 mx-auto max-w-2xl px-4 animate-fade-in">
            Leading with vision. Building with 
             <span className="text-zinc-200 font-semibold"> precision.</span>
          </h2>
        </div>
      </section>

      {/* About / Philosophy Section */}
      <section id="about" className="w-full py-4 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full mt-12 md:mt-0">
          
          {/* Animated Photo Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            // Removed distinct bottom white border as requested
            className="relative w-full h-[650px] flex flex-col justify-end translate-y-12"
          >
             {/* Replace /me-big.png with your actual large photo file */}
             <Image 
                src="/me-big.png" 
                alt="Gung Febrian"
                fill
                className="object-cover object-top"
                priority
             />
             {/* Gradient overlay for text readability at bottom */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
             
             <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                <h3 className="text-4xl font-bold text-white font-display drop-shadow-lg">Gung Febrian</h3>
                <p className="text-zinc-200 drop-shadow-md text-lg mb-4">ITS 23 - Computer Engineer </p>
                {/* Designer Line - White */}
                <div className="w-24 h-1 bg-white rounded-full"></div>
             </div>
          </motion.div>

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
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                I don't just write code; I lead movements. My philosophy is built on the intersection of three pillars: technical expertise, physical discipline, and global leadership.
                </p>
            </motion.div>
            
            <div className="space-y-4">
              <Card>
                <div className="flex gap-4 p-4 items-start">
                  <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Tech Innovator</h3>
                    <p className="text-sm text-zinc-400">Specializing in IoT, Python, and Data Analysis. Solving complex problems.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex gap-4 p-4 items-start">
                  <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Hybrid Athlete</h3>
                    <p className="text-sm text-zinc-400">Discipline, endurance, and the relentless will to improve.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex gap-4 p-4 items-start">
                  <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Global Leader</h3>
                    <p className="text-sm text-zinc-400">Experience with AIESEC and TEDx. Bridging cultures and leading teams.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="w-full py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-100 font-display">Leadership Journey</h2>
          <p className="text-zinc-400">
            A track record of taking initiative and driving impact.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
               <div className="md:w-1/4">
                  <span className="text-zinc-500 font-mono text-sm">2023 - 2024</span>
                  <h3 className="text-xl font-bold text-zinc-200 mt-1 font-display">President</h3>
                  <p className="text-zinc-400 text-sm">Computer Engineering</p>
               </div>
               <div className="md:w-3/4 border-l border-zinc-800 pl-6 md:pl-8">
                  <ul className="list-disc list-outside text-zinc-400 space-y-2 text-sm">
                    <li>Led the student body with a focus on academic excellence and innovation.</li>
                    <li>Implemented new workshops focusing on IoT and modern tech stacks.</li>
                    <li>Fostered a culture of "will to change," improving student engagement by 40%.</li>
                  </ul>
               </div>
            </div>
          </Card>

          <Card>
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
               <div className="md:w-1/4">
                  <span className="text-zinc-500 font-mono text-sm">Various Dates</span>
                  <h3 className="text-xl font-bold text-zinc-200 mt-1 font-display">Global Volunteer</h3>
                  <p className="text-zinc-400 text-sm">AIESEC & TEDx</p>
               </div>
               <div className="md:w-3/4 border-l border-zinc-800 pl-6 md:pl-8">
                  <ul className="list-disc list-outside text-zinc-400 space-y-2 text-sm">
                    <li>Collaborated with international teams to deliver impactful social projects.</li>
                    <li>Managed logistics and speaker relations for large-scale TEDx events.</li>
                    <li>Developed cross-cultural communication skills essential for modern tech leadership.</li>
                  </ul>
               </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer / CTA */}
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
               © 2025 Gung Febrian. "Courage. Leadership. Improvement."
            </p>
         </div>
      </footer>

    </div>
  );
}