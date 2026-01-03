"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';

const socials = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/gungfebrian", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/gungfebrian", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/gunkfebrian", label: "Instagram" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:guefef17@gmail.com", label: "Email" },
];

const Footer = () => {
    const [scrollY, setScrollY] = useState(0);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!footerRef.current) return;
            const rect = footerRef.current.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top;
            const relativeScroll = window.scrollY - offsetTop + window.innerHeight;

            setScrollY(Math.max(0, relativeScroll));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative w-full py-32 px-6"
        >
            {/* MAIN CONTENT with Parallax */}
            <div className="relative z-10 flex items-center justify-center">
                <div className="max-w-5xl mx-auto w-full">

                    {/* Dramatic Headline */}
                    <div
                        className="text-center mb-24"
                        style={{
                            transform: `translateY(${Math.max(0, 200 - scrollY * 0.4)}px) scale(${Math.min(1, 0.6 + scrollY * 0.0006)})`,
                            opacity: Math.min(1, scrollY * 0.003),
                        }}
                    >
                        <p className="text-zinc-600 text-xs uppercase tracking-[0.5em] mb-8">
                            The Journey Continues
                        </p>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-display mb-10 leading-none">
                            Every project<br />
                            tells a <span className="text-zinc-400 italic">story</span>
                        </h2>

                        <p
                            className="text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto mb-16"
                            style={{
                                opacity: Math.min(1, (scrollY - 100) * 0.004),
                                transform: `translateY(${Math.max(0, 50 - (scrollY - 100) * 0.3)}px)`
                            }}
                        >
                            A problem to solve, a system to build, and something new learned along the way.
                        </p>

                        {/* CTA Button */}
                        <div
                            style={{
                                opacity: Math.min(1, (scrollY - 150) * 0.005),
                                transform: `translateY(${Math.max(0, 60 - (scrollY - 150) * 0.3)}px)`
                            }}
                        >
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 px-12 py-6 bg-white text-black text-xl font-semibold rounded-full hover:bg-zinc-100 transition-all duration-300 hover:scale-105"
                            >
                                <span>Let's Work Together</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <div
                        className="h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-20"
                        style={{
                            opacity: Math.min(1, (scrollY - 200) * 0.003),
                            transform: `scaleX(${Math.min(1, (scrollY - 200) * 0.003)})`
                        }}
                    />

                    {/* Footer Info Grid */}
                    <div
                        className="grid md:grid-cols-2 gap-16"
                        style={{
                            opacity: Math.min(1, (scrollY - 250) * 0.004),
                            transform: `translateY(${Math.max(0, 80 - (scrollY - 250) * 0.3)}px)`
                        }}
                    >
                        {/* Left - Info */}
                        <div>
                            <h3 className="text-3xl font-bold text-white font-display mb-6">Gung Febrian</h3>
                            <p className="text-zinc-500 text-base leading-relaxed mb-8">
                                Computer Engineering Student<br />
                                Institut Teknologi Sepuluh Nopember<br />
                                Surabaya, Indonesia
                            </p>
                            <div className="flex gap-4">
                                {socials.map((social) => (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        aria-label={social.label}
                                        className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 hover:scale-110 transition-all duration-300"
                                    >
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right - Navigation */}
                        <div className="md:text-right">
                            <h4 className="text-sm font-semibold text-zinc-600 uppercase tracking-widest mb-8">Navigate</h4>
                            <div className="flex flex-col gap-5 md:items-end">
                                {[
                                    { label: 'Home', href: '/' },
                                    { label: 'Projects', href: '/projects' },
                                    { label: 'Contact', href: '/contact' },
                                    { label: 'Resume', href: '/resume.pdf', external: true }
                                ].map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        target={link.external ? '_blank' : undefined}
                                        className="text-zinc-400 hover:text-white transition-colors duration-200 text-xl"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div
                        className="mt-24 pt-12 border-t border-zinc-900 text-center"
                        style={{
                            opacity: Math.min(1, (scrollY - 400) * 0.004)
                        }}
                    >
                        <p className="text-zinc-600 text-sm">
                            © {new Date().getFullYear()} Gung Febrian. Designed and built with purpose.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
