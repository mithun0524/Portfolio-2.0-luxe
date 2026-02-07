"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-[#050505]"
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background: "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(201, 169, 98, 0.08) 0%, transparent 60%)",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(180, 167, 214, 0.06) 0%, transparent 50%)",
                    }}
                />
            </div>

            {/* Editorial grid lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="h-full max-w-[1800px] mx-auto px-[var(--gutter)] grid grid-cols-12 gap-[var(--gutter)]">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-full border-l border-white/[0.02]" />
                    ))}
                </div>
            </div>

            {/* Main content */}
            <motion.div
                className="relative z-10 min-h-screen flex flex-col justify-between px-[var(--gutter)] py-32"
                style={{ opacity }}
            >
                {/* Top bar */}
                <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <span className="text-overline">Portfolio 2026</span>
                    <div className="flex items-center gap-6">
                        <span className="text-overline hidden sm:block">Based in Remote</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#9caf88] animate-pulse" />
                            <span className="text-overline text-[#9caf88]">Available</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main masthead */}
                <motion.div
                    className="flex-1 flex flex-col justify-center max-w-[1800px] mx-auto w-full"
                    style={{ y: textY, scale }}
                >
                    {/* Name - Editorial treatment */}
                    <div className="overflow-hidden mb-4">
                        <TextReveal
                            className="text-overline text-[var(--warm-gray)] mb-4"
                            delay={0.3}
                            type="words"
                        >
                            Creative Full-Stack Developer
                        </TextReveal>
                    </div>

                    <div className="overflow-hidden">
                        <TextReveal
                            className="font-editorial text-massive text-[var(--off-white)] leading-[0.85]"
                            delay={0.4}
                            type="characters"
                        >
                            CREATIVE
                        </TextReveal>
                    </div>

                    <div className="overflow-hidden mt-2">
                        <TextReveal
                            className="font-editorial-italic text-massive text-outline leading-[0.85] -mt-4"
                            delay={0.6}
                            type="characters"
                        >
                            Developer
                        </TextReveal>
                    </div>

                    {/* Tagline row */}
                    <motion.div
                        className="grid grid-cols-12 gap-[var(--gutter)] mt-16 items-end"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        {/* Left - decorative number */}
                        <div className="col-span-2 hidden lg:block">
                            <span className="font-editorial text-8xl text-white/5">01</span>
                        </div>

                        {/* Center - tagline */}
                        <div className="col-span-12 lg:col-span-5">
                            <p className="text-body-large text-[var(--warm-gray)] max-w-md">
                                Crafting immersive digital experiences at the intersection of{" "}
                                <span className="text-[var(--accent-gold)]">Web3</span> and{" "}
                                <span className="text-[var(--accent-lavender)]">Artificial Intelligence</span>.
                            </p>
                        </div>

                        {/* Right - scroll indicator */}
                        <div className="col-span-12 lg:col-span-5 flex justify-end">
                            <motion.div
                                className="flex flex-col items-end gap-4"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-overline text-[var(--warm-gray)]">Scroll to explore</span>
                                <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                    className="flex items-end justify-between pt-8"
                    style={{ y }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <div className="flex gap-8">
                        {["React", "Next.js", "Solidity", "AI/ML"].map((tech, i) => (
                            <motion.span
                                key={tech}
                                className="text-caption text-[var(--warm-gray)] hover:text-[var(--off-white)] transition-colors cursor-default"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 + i * 0.1 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <Magnetic>
                            <motion.a
                                href="#work"
                                className="btn-editorial btn-gold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                <span>View Selected Work</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.a>
                        </Magnetic>
                    </div>
                </motion.div>
            </motion.div>

            {/* Side text - vertical */}
            <motion.div
                className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <span className="text-vertical text-overline text-[var(--warm-gray)] tracking-[0.3em]">
                    FOLIO — 2026
                </span>
            </motion.div>

            {/* Decorative corner element */}
            <motion.div
                className="absolute bottom-8 right-8 hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
            >
                <div className="w-24 h-24 border border-white/5 flex items-center justify-center">
                    <div className="w-12 h-12 border border-[var(--accent-gold)]/20 rotate-45" />
                </div>
            </motion.div>
        </section>
    );
}
