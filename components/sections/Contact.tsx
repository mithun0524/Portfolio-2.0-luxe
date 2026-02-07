"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socialLinks = [
    { name: "GitHub", url: "https://github.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Discord", url: "https://discord.com" },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="flex min-h-screen bg-[#050505] relative items-center py-20 px-[var(--gutter)]"
        >
            {/* Decorative line */}
            <div className="absolute top-0 left-0 right-0 divider-editorial" />

            <div className="w-full max-w-[1600px] mx-auto flex flex-col h-full justify-center">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-[var(--gutter)] w-full items-start">

                    {/* Left - Header & Form */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full lg:pr-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="mb-12 lg:mb-8"
                        >
                            <span className="text-overline text-[var(--accent-copper)]">04 — Contact</span>
                            <h2 className="font-editorial text-5xl md:text-6xl lg:text-7xl text-[var(--off-white)] mt-4 leading-[0.9]">
                                Let&apos;s Create<br />
                                <span className="font-editorial-italic text-outline">Something Together</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                                {/* Compact Form Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-[var(--off-white)] text-base focus:outline-none focus:border-[var(--accent-gold)] transition-colors placeholder-white/20"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-[var(--off-white)] text-base focus:outline-none focus:border-[var(--accent-gold)] transition-colors placeholder-white/20"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-[var(--off-white)] text-base focus:outline-none focus:border-[var(--accent-gold)] transition-colors resize-none placeholder-white/20"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="btn-editorial btn-gold w-full mt-4"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right - Info & Socials */}
                    <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center h-full lg:pt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
                                <div>
                                    <span className="text-caption text-[var(--warm-gray)] block mb-2">Based in</span>
                                    <span className="text-lg text-[var(--off-white)]">Remote<br />Available Worldwide</span>
                                </div>
                                <div>
                                    <span className="text-caption text-[var(--warm-gray)] block mb-2">Email</span>
                                    <a href="mailto:hello@developer.dev" className="text-lg text-[var(--off-white)] hover:text-[var(--accent-gold)] transition-colors">
                                        hello@developer.dev
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {socialLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between py-2 border-b border-white/5 text-[var(--off-white)] hover:text-[var(--accent-gold)] transition-colors group"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.4 + i * 0.05 }}
                                    >
                                        <span className="text-base">{link.name}</span>
                                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Compact Footer */}
                <motion.footer
                    className="mt-16 lg:mt-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex items-center gap-4">
                        <span className="font-editorial text-lg text-[var(--off-white)]">D</span>
                        <span className="text-caption text-[var(--warm-gray)]">© {new Date().getFullYear()} Developer</span>
                    </div>
                    <div className="flex items-center gap-6 text-caption text-[var(--warm-gray)]">
                        <span>Crafted with precision</span>
                        <span className="hidden md:inline">·</span>
                        <span>Next.js · Tailwind · Framer</span>
                    </div>
                </motion.footer>
            </div>

        </section>
    );
}
