import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { Eye, View } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8 w-full flex flex-col md:flex-row gap-6 items-start">
				{project.image && (
					<div className="relative w-full md:w-48 h-32 md:h-32 shrink-0 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800">
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover"
						/>
					</div>
				)}
				<div className="w-full">
					<div className="flex justify-between gap-2 items-center mb-2">
						<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
							{project.date ? (
								<time dateTime={new Date(project.date).toISOString()}>
									{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
										new Date(project.date),
									)}
								</time>
							) : (
								<span>SOON</span>
							)}
						</span>
						<span className="text-zinc-500 text-xs  flex items-center gap-1">
							<Eye className="w-4 h-4" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>
					</div>
					<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
						{project.title}
					</h2>
					<p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
						{project.description}
					</p>
				</div>
			</article>
		</Link>
	);
};