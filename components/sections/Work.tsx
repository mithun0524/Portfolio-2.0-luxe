"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue } from "framer-motion";

interface Project {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    description: string;
    image: string;
    tech: string[];
    featured?: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Decentralized",
        subtitle: "Finance Protocol",
        category: "Web3 / DeFi",
        year: "2025",
        description: "A next-generation DeFi protocol enabling seamless cross-chain liquidity with automated yield optimization.",
        image: "linear-gradient(135deg, #1a1f2e 0%, #2d1f1f 100%)",
        tech: ["Solidity", "The Graph", "React"],
        featured: true,
    },
    {
        id: 2,
        title: "Neural",
        subtitle: "Code Assistant",
        category: "AI / Machine Learning",
        year: "2025",
        description: "An AI-powered development tool that understands context, generates code, and learns from your patterns.",
        image: "linear-gradient(135deg, #2d2d3a 0%, #1a1a2e 100%)",
        tech: ["OpenAI", "LangChain", "Next.js"],
        featured: true,
    },
    {
        id: 3,
        title: "Governance",
        subtitle: "DAO Platform",
        category: "Web3 / Governance",
        year: "2024",
        description: "Enterprise-grade DAO infrastructure with quadratic voting, delegation, and on-chain execution.",
        image: "linear-gradient(135deg, #1f2d2d 0%, #1a1a1a 100%)",
        tech: ["Solidity", "IPFS", "TypeScript"],
    },
    {
        id: 4,
        title: "Generative",
        subtitle: "Art Engine",
        category: "Creative / AI",
        year: "2024",
        description: "A real-time generative art platform powered by diffusion models and interactive parameters.",
        image: "linear-gradient(135deg, #2d1f2d 0%, #1a1a1a 100%)",
        tech: ["Stable Diffusion", "WebGL", "Python"],
    },
    {
        id: 5,
        title: "Identity",
        subtitle: "Web3 Auth",
        category: "Web3 / Infrastructure",
        year: "2024",
        description: "Decentralized identity solution with zero-knowledge proofs and cross-platform SSO.",
        image: "linear-gradient(135deg, #1a2d2d 0%, #0f1a1a 100%)",
        tech: ["ZK-SNARKs", "Ethereum", "Node.js"],
    },
];

export default function Work() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Spring physics for the "bounce" feel
    const springScroll = useSpring(scrollYProgress, { stiffness: 90, damping: 20, restDelta: 0.001 });

    const x = useTransform(springScroll, [0, 1], ["0%", `-${(projects.length - 1) * 100}%`]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.round(latest * (projects.length - 1));
        setActiveIndex(Math.min(Math.max(index, 0), projects.length - 1));
    });

    return (
        <section
            id="work"
            ref={containerRef}
            className="relative bg-[#050505]"
            style={{ height: `${projects.length * 100}vh` }}
        >
            {/* Snap Spacers - Invisible triggers for scroll snapping */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {projects.map((_, i) => (
                    <div
                        key={i}
                        className="h-screen w-full snap-start"
                        style={{ top: `${i * 100}vh`, position: "absolute" }}
                    />
                ))}
            </div>

            <div className="sticky top-0 h-screen overflow-hidden z-10">
                {/* Header */}
                <div className="absolute top-8 left-[var(--gutter)] right-[var(--gutter)] z-20 flex items-start justify-between">
                    <div>
                        <span className="text-overline text-[var(--accent-gold)] block">
                            01 — Selected Work
                        </span>
                        <h2 className="font-editorial text-headline text-[var(--off-white)] mt-2">
                            Featured Projects
                        </h2>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <span className="number-editorial text-4xl text-[var(--off-white)] transition-all duration-300">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <div className="w-20 h-px bg-white/10 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-[var(--accent-gold)]"
                                style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                                layoutId="progress"
                            />
                        </div>
                        <span className="number-editorial text-lg text-[var(--warm-gray)]">
                            {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* Horizontal Container with Spring Physics */}
                <motion.div
                    className="flex h-full will-change-transform"
                    style={{ x }}
                >
                    {projects.map((project, i) => (
                        <ProjectSlide
                            key={project.id}
                            project={project}
                            index={i}
                            isActive={activeIndex === i}
                        />
                    ))}
                </motion.div>

                {/* Navigation dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {projects.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i
                                ? "w-8 bg-[var(--accent-gold)]"
                                : "w-2 bg-white/20"
                                }`}
                        />
                    ))}
                </div>

                {/* Side progress */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 z-20">
                    {projects.map((_, i) => (
                        <div
                            key={i}
                            className={`w-0.5 rounded-full transition-all duration-300 ${i <= activeIndex ? "bg-[var(--accent-gold)]" : "bg-white/10"
                                } ${activeIndex === i ? "h-12" : "h-6"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectSlide({
    project,
    index,
    isActive,
}: {
    project: Project;
    index: number;
    isActive: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-[var(--gutter)] pt-28 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[var(--gutter)] w-full max-w-[1600px] h-full items-center">
                <div
                    className={`lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 transition-all duration-500 ${isActive ? "opacity-100 translate-x-0" : "opacity-20 -translate-x-8"
                        }`}
                >
                    <span className="text-overline text-[var(--accent-gold)] mb-4">
                        {project.category}
                    </span>

                    <h3 className="font-editorial text-5xl md:text-6xl lg:text-7xl text-[var(--off-white)] leading-[0.9]">
                        {project.title}
                    </h3>
                    <h4 className="font-editorial-italic text-3xl md:text-4xl text-outline mt-2">
                        {project.subtitle}
                    </h4>

                    <p className="text-lg text-[var(--warm-gray)] mt-8 max-w-md leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-8">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="text-caption text-[var(--warm-gray)] px-4 py-2 border border-white/5"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <motion.a
                        href="#"
                        className="btn-editorial btn-gold mt-10 w-fit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>View Case Study</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </div>

                <div
                    className={`lg:col-span-7 flex items-center justify-center order-1 lg:order-2 cursor-loupe transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-30 scale-90"
                        }`}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{ perspective: 1200 }}
                >
                    <motion.div
                        className="relative w-full max-w-2xl aspect-[4/3]"
                        style={{
                            rotateX: isHovered ? rotateX : 0,
                            rotateY: isHovered ? rotateY : 0,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <div className="absolute -left-8 -top-8 z-0 pointer-events-none select-none">
                            <span className="font-editorial text-[10rem] text-white/[0.03] leading-none">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="relative w-full h-full border border-white/5 p-3">
                            <div className="absolute inset-2 border border-white/[0.03]" />

                            <div className="w-full h-full" style={{ background: project.image }}>
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <div
                                            className={`w-24 h-24 mx-auto border flex items-center justify-center mb-4 transition-colors duration-300 ${isActive ? "border-[var(--accent-gold)]/30" : "border-white/10"
                                                }`}
                                        >
                                            <span className="font-editorial text-4xl text-white/20">
                                                {project.title.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-caption text-white/20">Project Preview</span>
                                    </div>
                                </div>
                            </div>

                            {project.featured && (
                                <div className="absolute top-6 right-6 px-4 py-2 glass">
                                    <span className="text-overline text-[var(--accent-gold)]">Featured</span>
                                </div>
                            )}

                            <div className="absolute bottom-6 right-6">
                                <span className="text-caption text-white/40">{project.year}</span>
                            </div>
                        </div>

                        <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-[var(--accent-gold)]/20" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
