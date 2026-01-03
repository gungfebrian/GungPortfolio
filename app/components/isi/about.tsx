"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AboutCard } from '../about-card';

// Dynamic import for 3D scene (no SSR)
const Scene3D = dynamic(() => import('../3d/Scene3D'), { ssr: false });
import {
    Cpu,
    Activity,
    Globe,
    Download,
    FolderOpen
} from "lucide-react";

const About = () => {
    return (
        <section id="about" className="relative w-full py-12 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex items-center overflow-hidden">
            {/* 3D Background */}
            <Scene3D />

            <div className="grid md:grid-cols-2 gap-16 items-center w-full mt-12 md:mt-0 relative z-10">

                {/* Photo Column - Simple Hover Reveal */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full h-[500px] md:h-[650px] translate-y-6 md:translate-y-12 group"
                >
                    {/* Ambient glow */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-zinc-600/20 blur-3xl opacity-50 group-hover:opacity-100 transition-all duration-700"></div>

                    {/* Glass Frame Container - Enhanced Contrast */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden backdrop-blur-2xl bg-white/5 border-2 border-white/15 shadow-2xl shadow-black/70 ring-1 ring-white/5 group-hover:bg-white/1 group-hover:border-white/20 group-hover:shadow-white/5 transition-all duration-700">

                        {/* Inner glass layer */}
                        <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>

                        {/* Photo - Grayscale to Color */}
                        <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
                            <Image
                                src="/Untitled.png"
                                alt="Gung Febrian"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

                        {/* Glass edge highlights */}
                        <div className="absolute inset-0 rounded-xl pointer-events-none">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                        </div>

                        {/* Accent stripe */}
                        <motion.div
                            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/50 via-white/30 to-transparent backdrop-blur-sm pointer-events-none"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />

                        {/* Text overlay - Lower position with less blur */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-4 z-10 pointer-events-none">
                            <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-black/70 to-transparent"></div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h3 className="text-3xl md:text-4xl font-bold text-white font-display drop-shadow-2xl mb-2">
                                    Gung Febrian
                                </h3>
                                <p className="text-zinc-200 drop-shadow-lg text-base md:text-lg mb-4">
                                    ITS 23 - Computer Engineer
                                </p>
                                <div className="h-1 w-24 bg-white/90 rounded-full shadow-lg group-hover:w-32 group-hover:shadow-white/20 transition-all duration-500"></div>
                            </motion.div>
                        </div>
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
                            I don't just write code. I build systems, lead teams, and ship ideas into reality. My philosophy is built on the intersection of three pillars: technical expertise, physical discipline, and global leadership.
                        </p>

                        {/* Dual Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 text-zinc-900 font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <FolderOpen className="w-4 h-4" />
                                <span className="text-sm font-semibold">View Projects</span>
                            </Link>

                            <Link
                                href="/resume.pdf"
                                target="_blank"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 hover:bg-zinc-900 transition-all duration-300"
                            >
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-medium">Download CV</span>
                            </Link>
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        <AboutCard>
                            <div className="flex gap-4 p-4 items-start">
                                <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200 shrink-0">
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Engineering & Systems</h3>
                                    <p className="text-sm text-zinc-400">I build end to end solutions: software, IoT, and data driven prototypes.</p>
                                </div>
                            </div>
                        </AboutCard>

                        <AboutCard>
                            <div className="flex gap-4 p-4 items-start">
                                <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200 shrink-0">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Execution & Discipline</h3>
                                    <p className="text-sm text-zinc-400">Consistent iteration, measurable progress, and strong habits on and off the screen.</p>
                                </div>
                            </div>
                        </AboutCard>

                        <AboutCard>
                            <div className="flex gap-4 p-4 items-start">
                                <div className="bg-zinc-800 p-2 rounded-lg text-zinc-200 shrink-0">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-200 mb-1">Global Leader</h3>
                                    <p className="text-sm text-zinc-400">Comfortable leading, supporting, and coordinating across diverse teams.</p>
                                </div>
                            </div>
                        </AboutCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
