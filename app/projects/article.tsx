import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`} className="block group/article">
			<article className="p-4 md:p-8 w-full flex flex-col md:flex-row gap-6 items-start transition-all duration-700 hover:scale-[1.01]">
				{project.image && (
					<div className="relative w-full md:w-48 h-32 md:h-32 shrink-0 overflow-hidden rounded-xl border-2 border-zinc-700/50 bg-zinc-800/50 backdrop-blur-sm shadow-lg shadow-black/20 group-hover/article:border-zinc-500/70 group-hover/article:shadow-zinc-500/10 transition-all duration-700">
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover transition-transform duration-700 group-hover/article:scale-105"
						/>
						{/* Glass overlay on image */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover/article:opacity-100 transition-opacity duration-700"></div>
					</div>
				)}
				<div className="w-full space-y-3">
					{/* Metadata row - Reduced prominence */}
					<div className="flex justify-between gap-2 items-center">
						<div className="flex items-center gap-2">
							<span className="text-xs text-zinc-500 group-hover/article:text-zinc-400 transition-colors duration-700 font-medium">
								{project.date ? (
									<time dateTime={new Date(project.date).toISOString()}>
										{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
											new Date(project.date),
										)}
									</time>
								) : null}
							</span>

							{/* Status Badge */}
							{project.status && (
								<span className={`
									inline-block px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wide border
									${project.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : ''}
									${project.status === 'In Progress' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : ''}
									${project.status === 'Upcoming' ? 'bg-zinc-800/80 border-zinc-700/70 text-zinc-400' : ''}
								`}>
									{project.status}
								</span>
							)}
						</div>

						<span className="text-zinc-600 text-xs flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-800/30 border border-zinc-700/30 group-hover/article:border-zinc-600/50 group-hover/article:text-zinc-500 transition-all duration-700">
							<Eye className="w-3.5 h-3.5 transition-transform duration-700 group-hover/article:scale-110" />
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>
					</div>

					{/* Title - Increased prominence */}
					<h2 className="text-xl font-bold lg:text-2xl text-zinc-100 group-hover/article:text-white font-display transition-colors duration-700 leading-tight">
						{project.title}
					</h2>

					{/* Description */}
					<p className="text-sm lg:text-base text-zinc-400 group-hover/article:text-zinc-300 leading-relaxed transition-colors duration-700">
						{project.description}
					</p>

					{/* Tech Stack Tags */}
					{project.tags && project.tags.length > 0 && (
						<div className="flex flex-wrap gap-1.5 pt-1">
							{project.tags.slice(0, 5).map((tag: string) => (
								<span
									key={tag}
									className="px-2 py-0.5 text-xs rounded-md bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 group-hover/article:border-zinc-600/60 group-hover/article:text-zinc-300 transition-all duration-700"
								>
									{tag}
								</span>
							))}
							{project.tags.length > 5 && (
								<span className="px-2 py-0.5 text-xs rounded-md bg-zinc-800/30 text-zinc-500">
									+{project.tags.length - 5}
								</span>
							)}
						</div>
					)}
				</div>
			</article>
		</Link>
	);
};