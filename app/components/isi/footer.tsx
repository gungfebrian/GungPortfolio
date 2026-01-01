"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full py-12 text-center border-t border-zinc-900 bg-zinc-950">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-bold text-zinc-100 font-display mb-4">Ready to Collaborate?</h2>
                <div className="flex justify-center gap-4 mb-8">
                    <Link href="/contact" className="px-6 py-2 bg-zinc-100 text-zinc-900 font-medium rounded hover:bg-zinc-200 transition-colors">
                        Contact Me
                    </Link>
                    <Link href="/projects" className="px-6 py-2 border border-zinc-700 text-zinc-300 font-medium rounded hover:border-zinc-500 transition-colors">
                        View Projects
                    </Link>
                </div>
                <p className="text-zinc-600 text-xs">
                    © 2025 Gung Febrian.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
