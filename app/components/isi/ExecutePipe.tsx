"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Updated icons to match the engineering workflow
import { Target, Layers, Cpu, Rocket } from 'lucide-react';

const ExecutePipe = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    {
      // Target: Matches "Establish targets and constraints"
      icon: <Target size={32} className="text-zinc-900" />,
      title: "Define",
      description: "Establish the problem, constraints, and performance targets.",
      color: "bg-zinc-200",
      label: "01"
    },
    {
      // Layers: Matches "System boundaries and isolation"
      icon: <Layers size={32} className="text-white" />,
      title: "Architect",
      description: "Design system boundaries and isolate real time control from heavy computation.",
      color: "bg-zinc-700",
      label: "02"
    },
    {
      // Cpu: Matches "Implement, hardware logic, and stability"
      icon: <Cpu size={32} className="text-white" />,
      title: "Build & Optimize",
      description: "Implement, test, measure, and refactor until stable under load.",
      color: "bg-zinc-900 border border-zinc-800",
      label: "03"
    },
    {
      // Rocket: Matches "Deploy and high-performance execution"
      icon: <Rocket size={32} className="text-zinc-900" />,
      title: "Delivery",
      description: "Package, document, and deploy a maintainable system.",
      color: "bg-zinc-100",
      label: "04"
    },
  ];

  return (
    <section id="pipeline" className="relative min-h-screen flex flex-col justify-center py-24 bg-transparent overflow-hidden">

      {/* --- BACKGROUND AMBIENT GLOW --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- STATIC HEADER --- */}
        <div className="text-center mb-24">
          <div className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-full bg-zinc-900/50">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Workflow System</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-white font-display uppercase tracking-tighter mb-6">
            Execution Pipeline
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            A repeatable process for building reliable systems.
          </p>
        </div>

        <div className="relative">
          {/* --- THE CONNECTING LINE --- */}
          <div className="hidden md:block absolute top-12 left-0 right-0 mx-[12.5%] h-[1px] z-0">
            <div className="w-full h-full bg-zinc-800/30 relative overflow-hidden">
              <AnimatePresence>
                {hoveredIndex !== null && (
                  <motion.div
                    key={hoveredIndex}
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                    className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-zinc-400/15 to-transparent"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* --- ANIMATED CARDS GRID --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.30 } },
              hidden: {}
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 }
                  }
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-2 text-[40px] font-mono font-black text-zinc-900/30 group-hover:text-zinc-700/50 transition-colors duration-500 select-none">
                  {step.label}
                </div>

                {/* Squaricle Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  className={`w-24 h-24 ${step.color} rounded-[2rem] rotate-3 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center mb-8 z-10 relative overflow-hidden shadow-2xl`}
                >
                  <div className="-rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    {step.icon}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3 font-display tracking-tight group-hover:text-zinc-200 transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed px-6 group-hover:text-zinc-400 transition-colors duration-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExecutePipe;