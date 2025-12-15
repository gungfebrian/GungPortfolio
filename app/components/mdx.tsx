// @ts-nocheck
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

function clsx(...args: any) {
	return args.filter(Boolean).join(" ");
}

// Custom YouTube Component
function YouTube({ id }: { id: string }) {
  return (
    <div className="relative w-full my-8 overflow-hidden rounded-xl border border-zinc-800 shadow-2xl aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}

const components = {
	h1: ({ className, ...props }) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0 text-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }) => (
		<h4
			className={clsx(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }) => (
		<h5
			className={clsx(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }) => (
		<h6
			className={clsx(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight text-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }) => (
		<Link
			className={clsx(
				"font-medium text-white underline underline-offset-4 hover:text-zinc-300",
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }) => (
		<p
			className={clsx("leading-7 [&:not(:first-child)]:mt-6 text-zinc-400", className)}
			{...props}
		/>
	),
    // Added specific color for bold text so it isn't black
    strong: ({ className, ...props }) => (
        <strong
            className={clsx("font-bold text-zinc-100", className)}
            {...props}
        />
    ),
	ul: ({ className, ...props }) => (
		<ul className={clsx("my-6 ml-6 list-disc text-zinc-400", className)} {...props} />
	),
	ol: ({ className, ...props }) => (
		<ol className={clsx("my-6 ml-6 list-decimal text-zinc-400", className)} {...props} />
	),
	li: ({ className, ...props }) => (
		<li className={clsx("mt-2 text-zinc-400", className)} {...props} />
	),
	blockquote: ({ className, ...props }) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-zinc-700 pl-6 italic text-zinc-300 [&>*]:text-zinc-400",
				className,
			)}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx("rounded-xl border border-zinc-800", className)}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }) => (
		<hr className="my-4 border-zinc-800 md:my-8" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto rounded-lg border border-zinc-800">
			<table className={clsx("w-full text-sm", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"m-0 border-t border-zinc-800 p-0 even:bg-zinc-900/50 hover:bg-zinc-900 transition-colors",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }) => (
		<th
			className={clsx(
				"border border-zinc-800 px-4 py-3 text-left font-bold text-zinc-200 bg-zinc-900 [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }) => (
		<td
			className={clsx(
				"border border-zinc-800 px-4 py-3 text-left text-zinc-400 [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-xl bg-zinc-950 border border-zinc-800 py-4",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }) => (
		<code
			className={clsx(
				"relative rounded border border-zinc-700 bg-zinc-900 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-300",
				className,
			)}
			{...props}
		/>
	),
	Image,
    YouTube,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}