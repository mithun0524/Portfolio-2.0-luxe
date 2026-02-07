"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface Experiment {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    gradient: string;
    year: string;
}

const experiments: Experiment[] = [
    {
        id: 1,
        title: "Generative",
        subtitle: "Landscapes",
        category: "Creative Coding",
        description: "Procedurally generated terrain using noise algorithms and WebGL shaders.",
        gradient: "from-[#1a1f2e] to-[#2d1f1f]",
        year: "2025",
    },
    {
        id: 2,
        title: "Voice",
        subtitle: "to Code",
        category: "AI Experiment",
        description: "Speak naturally and watch as your words transform into functional code.",
        gradient: "from-[#2d2d3a] to-[#1a1a2e]",
        year: "2025",
    },
    {
        id: 3,
        title: "On-chain",
        subtitle: "Visualizer",
        category: "Web3 Tool",
        description: "Real-time blockchain data transformed into mesmerizing visual patterns.",
        gradient: "from-[#1f2d2d] to-[#1a1a1a]",
        year: "2024",
    },
    {
        id: 4,
        title: "Neural",
        subtitle: "Portraits",
        category: "AI Art",
        description: "AI-generated portraits that blend classical art techniques with modern aesthetics.",
        gradient: "from-[#2d1f2d] to-[#1a1a1a]",
        year: "2024",
    },
];

export default function Lab() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section
            id="lab"
            ref={ref}
            className="section-editorial bg-[#050505] relative overflow-hidden"
        >
            {/* Decorative line */}
            <div className="absolute top-0 left-0 right-0 divider-editorial" />

            <div className="max-w-[1800px] mx-auto">
                {/* Section header */}
                <motion.div
                    className="mb-24 editorial-grid"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="col-span-12 lg:col-span-6">
                        <span className="text-overline text-[var(--accent-sage)]">03 — Laboratory</span>
                        <h2 className="font-editorial text-display text-[var(--off-white)] mt-4">
                            Experiments
                        </h2>
                        <p className="text-body-large text-[var(--warm-gray)] mt-6 max-w-lg">
                            A playground for creative exploration. Technical experiments, AI tools, and generative art.
                        </p>
                    </div>
                    <div className="col-span-12 lg:col-span-6 lg:flex lg:justify-end lg:items-end">
                        <span className="hidden lg:block font-editorial text-8xl text-white/5">03</span>
                    </div>
                </motion.div>

                {/* Experiments grid - Editorial asymmetric */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {experiments.map((experiment, i) => (
                        <motion.article
                            key={experiment.id}
                            className={`relative group cursor-pointer bg-gradient-to-br ${experiment.gradient} aspect-[4/3] overflow-hidden`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                            onMouseEnter={() => setHoveredId(experiment.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setSelectedExperiment(experiment)}
                        >
                            {/* Content overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                {/* Top */}
                                <div className="flex justify-between items-start">
                                    <span className="text-overline text-white/40">{experiment.category}</span>
                                    <span className="text-caption text-white/30">{experiment.year}</span>
                                </div>

                                {/* Bottom */}
                                <div>
                                    <motion.div
                                        animate={{ y: hoveredId === experiment.id ? -10 : 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <h3 className="font-editorial text-4xl md:text-5xl text-[var(--off-white)] leading-[0.9]">
                                            {experiment.title}
                                        </h3>
                                        <h4 className="font-editorial-italic text-2xl md:text-3xl text-outline mt-1">
                                            {experiment.subtitle}
                                        </h4>
                                    </motion.div>

                                    <motion.p
                                        className="text-sm text-[var(--warm-gray)] mt-4 max-w-sm"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: hoveredId === experiment.id ? 1 : 0,
                                            y: hoveredId === experiment.id ? 0 : 10
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {experiment.description}
                                    </motion.p>
                                </div>
                            </div>

                            {/* Hover reveal line */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent-gold)]"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: hoveredId === experiment.id ? 1 : 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ transformOrigin: "left" }}
                            />

                            {/* Number overlay */}
                            <div className="absolute right-8 bottom-8 opacity-5">
                                <span className="font-editorial text-[12rem] leading-none">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>

                            {/* View indicator */}
                            <motion.div
                                className="absolute right-8 top-1/2 -translate-y-1/2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: hoveredId === experiment.id ? 1 : 0,
                                    x: hoveredId === experiment.id ? 0 : 20
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-12 h-12 border border-[var(--accent-gold)] rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </motion.div>
                        </motion.article>
                    ))}
                </div>

                {/* Coming soon */}
                <motion.div
                    className="mt-16 flex items-center justify-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-caption text-[var(--warm-gray)]">More experiments in progress</span>
                    <div className="h-px flex-1 bg-white/5" />
                </motion.div>
            </div>

            {/* Experiment Modal */}
            <AnimatePresence>
                {selectedExperiment && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-[var(--gutter)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedExperiment(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-sm" />

                        {/* Modal */}
                        <motion.div
                            className="relative bg-[#0a0a0a] border border-white/5 p-12 max-w-2xl w-full"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-6 right-6 w-10 h-10 border border-white/10 flex items-center justify-center text-[var(--warm-gray)] hover:text-[var(--off-white)] hover:border-white/20 transition-colors"
                                onClick={() => setSelectedExperiment(null)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <span className="text-overline text-[var(--accent-sage)]">{selectedExperiment.category}</span>

                            <h3 className="font-editorial text-5xl text-[var(--off-white)] mt-4">
                                {selectedExperiment.title}
                            </h3>
                            <h4 className="font-editorial-italic text-3xl text-outline">
                                {selectedExperiment.subtitle}
                            </h4>

                            <p className="text-body-large text-[var(--warm-gray)] mt-8">
                                {selectedExperiment.description}
                            </p>

                            <div className="flex gap-4 mt-12">
                                <motion.button
                                    className="btn-editorial btn-gold flex-1"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Launch Demo</span>
                                </motion.button>
                                <motion.button
                                    className="btn-editorial"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Source</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
