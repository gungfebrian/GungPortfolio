"use client";

import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
		const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
		setMousePosition({ x, y });
	};

	return (
		<Link href={`/projects/${project.slug}`} className="block group/article">
			<motion.article
				className="relative h-[420px] md:h-[480px] rounded-[32px] overflow-visible transition-all duration-500 ease-out group-hover/article:z-10"
				onMouseMove={handleMouseMove}
				animate={{
					rotateY: mousePosition.x * 2,
					rotateX: -mousePosition.y * 2,
				}}
				transition={{
					type: "spring",
					stiffness: 120,
					damping: 15,
				}}
				style={{ transformStyle: "preserve-3d", willChange: "transform" }}
			>

				{/* Background card */}
				<div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-zinc-900/80 to-zinc-900/60 backdrop-blur-xl border-2 border-zinc-800/50 group-hover/article:from-zinc-900/90 group-hover/article:to-zinc-900/70 group-hover/article:border-zinc-700/70 group-hover/article:shadow-2xl group-hover/article:shadow-black/60 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }} />

				{/* Hover glow */}
				<div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover/article:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }} />

				{/* Content */}
				<div className="relative h-full flex flex-col p-8 justify-between">

					{/* Image - cleaner expansion */}
					<div className="relative w-full h-48 md:h-56 group-hover/article:h-52 md:group-hover/article:h-64 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}>
						<div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-zinc-700/50 group-hover/article:border-zinc-600/70 transition-all duration-500 shadow-lg group-hover/article:shadow-xl" style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}>
							{project.image ? (
								<>
									<Image
										src={project.image}
										alt={project.title}
										fill
										className="object-cover transition-all duration-700 group-hover/article:scale-105 group-hover/article:brightness-110 group-hover/article:saturate-110"
										style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-400" />
								</>
							) : (
								<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/80 via-zinc-800/60 to-zinc-900/80 flex items-center justify-center">
									<div className="text-6xl font-bold text-zinc-700/30 font-display">
										{project.title.charAt(0)}
									</div>
								</div>
							)}

							{/* View count */}
							<div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
								<Eye className="w-3.5 h-3.5 text-zinc-300" />
								<span className="text-xs font-medium text-zinc-300">
									{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
								</span>
							</div>

							{/* Status */}
							{project.status && (
								<div className="absolute top-3 left-3">
									<span className={`
										inline-block px-2.5 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-md
										${project.status === 'Completed' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-200' : ''}
										${project.status === 'In Progress' ? 'bg-amber-500/20 border-amber-500/30 text-amber-200 animate-pulse' : ''}
										${project.status === 'Upcoming' ? 'bg-zinc-800/60 border-zinc-700/50 text-zinc-300' : ''}
									`}>
										{project.status}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Text content */}
					<div className="space-y-3 mt-4">

						{/* Title */}
						<h2 className="text-2xl font-bold text-zinc-100 group-hover/article:text-white font-display transition-colors duration-300">
							{project.title}
						</h2>

						{/* Teaser - Now visible by default */}
						{(project.teaser || project.description) && (
							<p className="text-sm text-zinc-500 group-hover/article:text-zinc-400 transition-colors duration-300 line-clamp-2">
								{project.teaser || project.description}
							</p>
						)}

						{/* Highlights */}
						{project.highlights && project.highlights.length > 0 && (
							<div className="flex flex-wrap gap-2 opacity-0 max-h-0 group-hover/article:opacity-100 group-hover/article:max-h-20 overflow-hidden transition-all duration-300" style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}>
								{project.highlights.slice(0, 3).map((highlight: string, idx: number) => (
									<span
										key={idx}
										className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-200 font-semibold backdrop-blur-sm"
									>
										<TrendingUp className="w-3.5 h-3.5" />
										{highlight}
									</span>
								))}
							</div>
						)}

						{/* Tags and CTA */}
						<div className="flex items-center justify-between gap-3 pt-2">
							<div className="flex flex-wrap gap-2">
								{project.tags?.slice(0, 3).map((tag) => (
									<span
										key={tag}
										className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800/50 text-zinc-400 border border-zinc-700/30 group-hover/article:bg-zinc-800/70 group-hover/article:text-zinc-300 group-hover/article:border-zinc-600/50 transition-all duration-300"
									>
										{tag}
									</span>
								))}
							</div>

							<div className="opacity-0 group-hover/article:opacity-100 transition-opacity duration-300 delay-100">
								<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-200 whitespace-nowrap">
									View Project
									<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.article>
		</Link>
	);
};