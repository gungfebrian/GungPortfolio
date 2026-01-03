"use client";
import { ArrowLeft, Search, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface Props {
	showSearch?: boolean;
	searchQuery?: string;
	setSearchQuery?: (query: string) => void;
}

export const Navigation: React.FC<Props> = ({ showSearch, searchQuery, setSearchQuery }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${isIntersecting
					? "bg-zinc-900/0 border-transparent"
					: "bg-zinc-900/500 border-zinc-800 "
					}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8 items-center">
						{showSearch && setSearchQuery && (
							<div className="relative w-full md:w-64 group mr-2 md:mr-4">
								<label htmlFor="project-search" className="sr-only">Search projects</label>
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Search className="w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
								</div>
								{/* Mobile placeholder */}
								<input
									id="project-search"
									type="text"
									className="block w-full p-1.5 pl-10 text-sm text-zinc-200 border border-zinc-800 rounded-full bg-zinc-900/50 outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 placeholder-zinc-600 transition-all md:hidden"
									placeholder="Search projects..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								{/* Desktop placeholder */}
								<input
									id="project-search-desktop"
									type="text"
									className="hidden md:block w-full p-1.5 pl-10 text-sm text-zinc-200 border border-zinc-800 rounded-full bg-zinc-900/50 outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 placeholder-zinc-600 transition-all"
									placeholder="Search projects..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										aria-label="Clear search"
										className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-300 focus-visible:text-zinc-300 focus-visible:outline-none transition-colors"
									>
										<X className="w-4 h-4" />
									</button>
								)}
							</div>
						)}
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100 focus-visible:text-zinc-100 focus-visible:outline-none rounded px-2 py-1 -mx-2 -my-1"
						>
							Contact
						</Link>
					</div>

					<Link
						href="/"
						aria-label="Go back to home page"
						className="duration-200 text-zinc-300 hover:text-zinc-100 focus-visible:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded p-1 -m-1"
					>
						<ArrowLeft className="w-6 h-6" />
					</Link>
				</div>
			</div>
		</header>
	);
};
