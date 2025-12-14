"use client";
import { ArrowLeft, Eye, Github, Twitter, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
		image?: string; // Added image prop
	};

	views: number;
};
export const Header: React.FC<Props> = ({ project, views }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string; icon: React.ReactNode }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
			icon: <Github className="w-5 h-5" />,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
			icon: <LinkIcon className="w-5 h-5" />,
		});
	}
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-zinc-900 min-h-[60vh] flex flex-col justify-center"
		>
			{/* Background Image */}
			{project.image && (
				<div className="absolute inset-0 -z-10">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover opacity-20 hover:opacity-30 duration-700"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
				</div>
			)}

			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/90 border-zinc-800 lg:border-transparent"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<span
							title="View counter for this page"
							className={`duration-200 hover:font-medium flex items-center gap-1 ${
								isIntersecting
									? " text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
							} `}
						>
							<Eye className="w-5 h-5" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>
						<Link target="_blank" href="https://twitter.com/chronark_">
							<Twitter
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/chronark">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
					</div>

					<Link
						href="/projects"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
			
			<div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-3xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display drop-shadow-lg">
							{project.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300 drop-shadow-md">
							{project.description}
						</p>
					</div>

					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
							{links.map((link) => (
								<Link 
                                    target="_blank" 
                                    key={link.label} 
                                    href={link.href}
                                    className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
                                >
									{link.label} <span aria-hidden="true">&rarr;</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};