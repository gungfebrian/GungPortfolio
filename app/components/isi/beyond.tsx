"use client";
import React from 'react';
import { Card } from '../card';
import { motion } from 'framer-motion';
import { Users, Mic2, Wifi, Activity, Cpu } from 'lucide-react';
import { RealAppleLogo } from '../icons/apple-logo';
import { TEDxLogo } from '../icons/tedx-logo';
import { AIESECLogo } from '../icons/aiesec-logo';

const BeyondTheCode = () => {
    const experiences = [
        {
            id: 1,
            role: "Cohort",
            organization: "Apple Developer Academy",
            period: "Upcoming 2026",
            description: "Admitted to the Apple Developer Academy program, focusing on end-to-end iOS product development using Swift and SwiftUI. The program emphasizes design thinking, collaboration, and building real-world applications across the full product lifecycle within the Apple ecosystem.",
            icon: RealAppleLogo,
        },
        {
            id: 2,
            role: "Laboratory Assistant",
            organization: "Computer Engineering Laboratory - ITS",
            period: "M-IoT Laboratory",
            highlights: [
                "managed the integration between ESP32 sensors and Python scripts to ensure data stayed accurate and reliable during testing.",
                "maintained Raspberry Pi prototypes and updated technical guides to help students troubleshoot hardware and software errors more effectively."
            ],
            icon: Cpu,
        },
        {
            id: 3,
            role: "International Relations",
            organization: "AIESEC",
            period: "Team Member",
            highlights: [
                "Facilitated international partnerships within the External Relations division.",
                "Managed cross-cultural communications with diverse global stakeholders.",
                "Executed social impact projects to drive community engagement."
            ],
            icon: AIESECLogo,
        },
        {
            id: 4,
            role: "Internal Relations",
            organization: "TEDxITS",
            period: "Organizer",
            highlights: [
                "Streamlined communication between speaker, production, and logistics teams.",
                "Ensured operational synergy for the seamless execution of large-scale events.",
                "Managed internal resources and schedules under strict timelines."
            ],
            icon: TEDxLogo,
        }
    ];

    return (
        <section id="experience" className="w-full py-24 px-6 md:px-12 max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-100 font-display">
                    Beyond the Code
                </h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
                    Technical skills build products, but leadership builds legacies. Here is how I drive impact outside the terminal.
                </p>
            </motion.div>

            {/* Cards with staggered animation */}
            <div className="space-y-8">
                {experiences.map((exp) => {
                    const IconComponent = exp.icon;

                    return (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "100px" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Card>
                                <div className="p-6 md:p-8">
                                    {/* Header section with icon and meta */}
                                    <div className="flex items-start gap-4 mb-6">
                                        {/* Icon */}
                                        <motion.div
                                            className="flex-shrink-0 w-14 h-14 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center"
                                            whileHover={{ scale: 1.05, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <IconComponent className="w-7 h-7 text-zinc-300" />
                                        </motion.div>

                                        {/* Title and meta */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl md:text-2xl font-bold text-zinc-100 font-display">
                                                    {exp.role}
                                                </h3>
                                                <span className="text-zinc-500 font-mono text-xs px-2 py-1 bg-zinc-800/50 rounded border border-zinc-700/50">
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <p className="text-zinc-400 text-sm md:text-base">
                                                {exp.organization}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content section */}
                                    <div className="pl-0 md:pl-[72px]">
                                        {exp.description ? (
                                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                                {exp.description}
                                            </p>
                                        ) : (
                                            <ul className="space-y-3">
                                                {exp.highlights?.map((highlight, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        initial={{ opacity: 0.8, x: 0 }}
                                                        whileHover={{ opacity: 1, x: 4 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="text-zinc-400 text-sm md:text-base leading-relaxed flex items-start gap-3 group"
                                                    >
                                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-zinc-400 mt-2 flex-shrink-0 transition-colors" />
                                                        <span className="flex-1">{highlight}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default BeyondTheCode;
