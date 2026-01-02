"use client";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";

import { MouseEventHandler, PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<motion.div
			onMouseMove={onMouseMove}
			whileHover={{ scale: 1.02 }}
			transition={{
				duration: 0.5,
				ease: "easeOut",
				scale: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
			}}
			className="overflow-hidden relative duration-700 border rounded-[32px] hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 cursor-pointer shadow-md shadow-black/30 hover:shadow-xl hover:shadow-black/50 backdrop-blur-sm bg-gradient-to-br from-zinc-900/80 to-zinc-900/60"
		>
			<div className="pointer-events-none rounded-[32px]">
				<div className="absolute inset-0 z-20 rounded-[32px] transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
				<motion.div
					className="absolute inset-0 z-30 rounded-[32px] bg-gradient-to-br opacity-100  via-zinc-100/10  transition duration-1000 group-hover:opacity-50 "
					style={style}
				/>
				<motion.div
					className="absolute inset-0 z-30 rounded-[32px] opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
					style={style}
				/>
			</div>

			{children}
		</motion.div>
	);
};