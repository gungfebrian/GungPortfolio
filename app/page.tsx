"use client";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import Particles from "./components/particles";
import { Card } from "./components/card";
import Image from "next/image";
import { motion } from "framer-motion";
import ExecutePipe from "./components/isi/ExecutePipe";

// Dynamic import for 3D scene (no SSR)
const Scene3D = dynamic(() => import("./components/3d/Scene3D"), { ssr: false });
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
  Mail,
  ArrowUp,
  ArrowRight
} from "lucide-react";
import BeyondTheCode from "./components/isi/beyond";
import About from "./components/isi/about";
import Footer from "./components/isi/footer";
import Journey from "./components/isi/journey";

// Navigation with Icons for Mobile
const navigation = [
  { name: "Home", href: "#home", icon: <HomeIcon className="w-5 h-5" /> },
  { name: "About", href: "#about", icon: <User className="w-5 h-5" /> },
  { name: "Experience", href: "#experience", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Projects", href: "/projects", icon: <Code2 className="w-5 h-5" /> },
  { name: "Contact", href: "/contact", icon: <Mail className="w-5 h-5" /> },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Home() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center w-screen overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black scroll-smooth">

      {/* --- NAVIGATION (Hybrid: Icons on Mobile, Text on Desktop) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 animate-fade-in border-b border-white/5 md:border-none bg-black/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none transition-all duration-300">
        <div className="flex items-center justify-center py-4 md:py-8 px-4 md:px-0">
          <ul className="flex items-center gap-4 md:gap-8 list-none">
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
                <span className="md:hidden p-2.5 rounded-full bg-zinc-800/50 text-zinc-400 group-hover:text-white group-hover:bg-zinc-700 transition-all border border-transparent group-hover:border-zinc-600
                  group-focus-visible:text-white group-focus-visible:bg-zinc-700 group-focus-visible:border-zinc-600 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-zinc-400">
                  {item.icon}
                </span>

                {/* Desktop View: Text */}
                <span className="hidden md:block text-sm font-medium duration-500 text-zinc-500 hover:text-zinc-200
                  group-focus-visible:text-zinc-200 group-focus-visible:outline-none group-focus-visible:underline group-focus-visible:underline-offset-4">
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
        <div className="z-10 text-center px-4 max-w-3xl mx-auto">

          {/* Fixed Badge: Wraps text on mobile to prevent overflow */}
          <div className="inline-flex flex-wrap justify-center items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2 mb-8 animate-fade-in mx-auto max-w-[90vw]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></span>
            <span className="text-xs text-zinc-400 text-center leading-tight">
              Computer Engineering Student <span className="hidden sm:inline">|</span> <br className="sm:hidden" /> AI & Embedded Systems
            </span>
          </div>

          <h1 className="inline-block py-2 pr-1 text-5xl sm:text-7xl md:text-9xl text-transparent duration-1000 bg-gradient-to-r from-white via-white to-white cursor-default text-edge-outline font-display whitespace-nowrap bg-clip-text animate-title drop-shadow-2xl">
            Gung Febrian
          </h1>

          <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 my-8 animate-fade-right animate-glow" />

          <h2 className="text-base md:text-lg text-zinc-400 mx-auto max-w-2xl px-4 animate-fade-in leading-loose">
            Leading with vision. Building with
            <span className="text-zinc-200 font-semibold block md:inline"> precision.</span>
          </h2>

          {/* Dominant CTA */}
          <div className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-900 rounded-full font-semibold hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                focus-visible:bg-white focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <About />

      <Journey />

      <ExecutePipe />

      <BeyondTheCode />

      <Footer />
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-500 shadow-lg backdrop-blur-sm z-50
          focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none
          ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll back to top of page"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}