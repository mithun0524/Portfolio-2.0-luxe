"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const skills = {
    frontend: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 92 },
        { name: "Three.js / WebGL", level: 78 },
        { name: "Framer Motion", level: 90 },
    ],
    backend: [
        { name: "Node.js", level: 88 },
        { name: "Python", level: 85 },
        { name: "GraphQL", level: 82 },
        { name: "PostgreSQL", level: 80 },
    ],
    web3: [
        { name: "Solidity", level: 88 },
        { name: "Ethers.js / Viem", level: 90 },
        { name: "IPFS / Arweave", level: 82 },
        { name: "The Graph", level: 78 },
    ],
    ai: [
        { name: "OpenAI / Claude API", level: 92 },
        { name: "LangChain", level: 85 },
        { name: "TensorFlow.js", level: 70 },
        { name: "Prompt Engineering", level: 95 },
    ],
};

const milestones = [
    { year: "2025", title: "Lead Developer", org: "Web3 Startup" },
    { year: "2024", title: "Senior Full-Stack", org: "AI Company" },
    { year: "2023", title: "Blockchain Dev", org: "DeFi Protocol" },
    { year: "2022", title: "Full-Stack Dev", org: "Tech Agency" },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    return (
        <section
            id="about"
            ref={containerRef}
            className="section-editorial bg-[#050505] relative"
        >
            {/* Decorative line */}
            <div className="absolute top-0 left-0 right-0 divider-editorial" />

            <div className="max-w-[1800px] mx-auto" ref={ref}>
                {/* Section header */}
                <motion.div
                    className="mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-overline text-[var(--accent-lavender)]">02 — About</span>
                            <h2 className="font-editorial text-display text-[var(--off-white)] mt-4">
                                The Journey
                            </h2>
                        </div>
                        <span className="hidden md:block font-editorial text-8xl text-white/5">02</span>
                    </div>
                </motion.div>

                {/* Main content - asymmetric grid */}
                <div className="editorial-grid">
                    {/* Left column - Image */}
                    <motion.div
                        className="col-span-12 lg:col-span-5 mb-16 lg:mb-0"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative img-frame aspect-[3/4] max-w-md">
                            <motion.div
                                className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] flex items-center justify-center"
                                style={{ y: imageY }}
                            >
                                <div className="text-center p-8">
                                    <div className="w-32 h-32 mx-auto border border-white/10 rounded-full flex items-center justify-center mb-6">
                                        <span className="font-editorial text-5xl text-[var(--accent-gold)]">D</span>
                                    </div>
                                    <span className="text-caption text-white/30">Portrait</span>
                                </div>
                            </motion.div>

                            {/* Decorative corner */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[var(--accent-gold)]/20" />
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-8 mt-12">
                            {[
                                { value: "5+", label: "Years" },
                                { value: "50+", label: "Projects" },
                                { value: "30+", label: "Clients" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    <span className="number-editorial text-4xl text-[var(--off-white)]">{stat.value}</span>
                                    <span className="block text-caption text-[var(--warm-gray)] mt-1">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right column - Story & Skills */}
                    <motion.div
                        className="col-span-12 lg:col-span-6 lg:col-start-7"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {/* Pull quote */}
                        <div className="pull-quote mb-12">
                            I believe the future of the internet is decentralized, intelligent, and user-owned.
                        </div>

                        {/* Bio */}
                        <div className="space-y-6 mb-16">
                            <p className="text-body-large text-[var(--warm-gray)]">
                                My journey began with curiosity—building simple websites that evolved into complex systems.
                                Today, I craft digital experiences at the intersection of blockchain technology and artificial intelligence.
                            </p>
                            <p className="text-body-large text-[var(--warm-gray)]">
                                From DeFi protocols to AI-powered tools, each project is an opportunity to push boundaries
                                and create something meaningful. I approach every challenge with both technical precision
                                and creative vision.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="space-y-12">
                            <h3 className="text-overline text-[var(--off-white)]">Expertise</h3>

                            {Object.entries(skills).map(([category, items], categoryIndex) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.5 + categoryIndex * 0.1 }}
                                >
                                    <h4 className="text-caption text-[var(--accent-gold)] mb-4">
                                        {category === "ai" ? "AI / ML" : category.charAt(0).toUpperCase() + category.slice(1)}
                                    </h4>
                                    <div className="space-y-3">
                                        {items.map((skill, i) => (
                                            <div key={skill.name} className="flex items-center gap-4">
                                                <span className="text-sm text-[var(--off-white)] w-40">{skill.name}</span>
                                                <div className="flex-1 skill-bar">
                                                    <motion.div
                                                        className="skill-bar-fill"
                                                        initial={{ scaleX: 0 }}
                                                        animate={isInView ? { scaleX: skill.level / 100 } : { scaleX: 0 }}
                                                        transition={{
                                                            duration: 1.2,
                                                            delay: 0.6 + categoryIndex * 0.1 + i * 0.05,
                                                            ease: [0.16, 1, 0.3, 1]
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-caption text-[var(--warm-gray)] w-10 text-right">
                                                    {skill.level}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Timeline */}
                <motion.div
                    className="mt-32"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className="divider-editorial mb-12" />

                    <div className="flex items-center justify-between mb-8">
                        <span className="text-overline text-[var(--off-white)]">Experience</span>
                        <span className="text-caption text-[var(--warm-gray)]">2022 — Present</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={milestone.year}
                                className="border-l border-white/10 pl-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.9 + i * 0.1 }}
                            >
                                <span className="number-editorial text-3xl text-[var(--accent-gold)]">{milestone.year}</span>
                                <h4 className="text-lg text-[var(--off-white)] mt-2">{milestone.title}</h4>
                                <span className="text-caption text-[var(--warm-gray)]">{milestone.org}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
