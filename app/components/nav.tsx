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
							<div className="relative w-full md:w-64 group mr-4 hidden md:block">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Search className="w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
								</div>
								<input
									type="text"
									className="block w-full p-1.5 pl-10 text-sm text-zinc-200 border border-zinc-800 rounded-full bg-zinc-900/50 focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 placeholder-zinc-600 transition-all"
									placeholder="Search projects..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-300"
									>
										<X className="w-4 h-4" />
									</button>
								)}
							</div>
						)}
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Contact
						</Link>
					</div>

					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};
