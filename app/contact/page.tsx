"use client";
import { Github, Mail, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";

const socials = [
	{
		icon: <Linkedin size={20} />,
		href: "https://linkedin.com/in/gungfebrian",
		label: "LinkedIn",
		handle: "gungfebrian",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:guefef17@gmail.com",
		label: "Email",
		handle: "guefef17@gmail.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/gungfebrian",
		label: "Github",
		handle: "gungfebrian",
	},
	{
		icon: <Instagram size={20} />,
		href: "https://instagram.com/gunkfebrian",
		label: "Instagram",
		handle: "@gunkfebrian",
	},
];

export default function Contact() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto pt-8">
				<div className="w-full max-w-6xl mx-auto mt-32 sm:mt-0">
					{/* Header Section */}
					<div className="text-center mb-16">
						<h1 className="text-4xl md:text-6xl font-bold text-zinc-100 font-display mb-4">
							Let's Connect
						</h1>
						<p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
							Open to opportunities, internships, research collaboration. Choose your preferred platform below.
						</p>
					</div>

					{/* Social Cards Grid - Original tall design */}
					<div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
						{socials.map((s) => (
							<Link
								key={s.label}
								href={s.href}
								target="_blank"
								className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 md:gap-8 md:py-24 lg:pb-48 md:p-16"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent group-hover:via-zinc-400"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-300 border rounded-full text-zinc-400 group-hover:text-zinc-100 group-hover:bg-zinc-800 border-zinc-600 bg-zinc-900 group-hover:border-zinc-500 shadow-lg group-hover:shadow-xl">
									{s.icon}
								</span>{" "}
								<div className="z-10 flex flex-col items-center">
									<span className="text-xl font-medium duration-300 lg:text-2xl text-zinc-300 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-300 text-zinc-500 group-hover:text-zinc-400">
										{s.label}
									</span>
								</div>
							</Link>
						))}
					</div>

					{/* Footer Note */}
					<div className="text-center mt-12 text-sm text-zinc-600">
						<p>Response time: Usually within 24 hours</p>
					</div>
				</div>
			</div>
		</div>
	);
}