"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
    {
        year: "2023",
        title: "The Beginning",
        description: "Curiosity led me into engineering… learning by building my first real things.",
        highlight: "First Steps"
    },
    {
        year: "2023",
        title: "Building Foundation",
        description: "Deployed real IoT projects in messy conditions… noise, power issues, and edge cases forced better architecture",
        highlight: "System Thinking"
    },
    {
        year: "2024",
        title: "Growth & Impact",
        description: "Started getting involved in organizations… learning to work with people, take ownership, and grow beyond writing code alone.",
        highlight: "Shared Impact"
    },
    {
        year: "2025",
        title: "Breaking Boundaries",
        description: "Integrated embedded hardware, computer vision, and full stack applications.",
        highlight: "Engineering meets Reliability, structure, and maintainability"
    },
    {
        year: "2026",
        title: "Next Chapter",
        description: "Apple Developer Academy. iOS ecosystem mastery. Building the future and so on.",
        highlight: "The journey continues..."
    }
];

export default function Journey() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-32 px-6 md:px-12 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-zinc-500 text-sm uppercase tracking-[0.3em] mb-4">
                        The Story So Far
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white font-display mb-6">
                        My Journey
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        A story shaped by curiosity, challenges, and growth.
                    </p>
                </motion.div>

                {/* Progress bar */}
                <div className="relative h-1 bg-zinc-800 rounded-full mb-16 overflow-hidden">
                    <motion.div
                        className="absolute h-full bg-gradient-to-r from-zinc-500 to-white rounded-full"
                        style={{ width: progressWidth }}
                    />
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-1/2" />

                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={milestone.year}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative flex items-start gap-8 mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Year bubble */}
                            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                                <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                                }`}>
                                <span className="inline-block text-zinc-500 text-sm font-mono mb-2">
                                    {milestone.year}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-3">
                                    {milestone.title}
                                </h3>
                                <p className="text-zinc-400 text-base mb-4 leading-relaxed">
                                    {milestone.description}
                                </p>
                                <p className="text-zinc-300 text-sm italic border-l-2 border-zinc-700 pl-4 md:border-l-0 md:border-r-2 md:pr-4 md:pl-0">
                                    "{milestone.highlight}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
