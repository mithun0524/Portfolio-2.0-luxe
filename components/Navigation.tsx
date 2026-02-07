"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

const navItems = [
    { label: "Work", href: "#work", number: "01" },
    { label: "About", href: "#about", number: "02" },
    { label: "Lab", href: "#lab", number: "03" },
    { label: "Contact", href: "#contact", number: "04" },
];

export default function Navigation() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show nav if scrolling up or at the very top
            if (currentScrollY < lastScrollY || currentScrollY < 50) {
                setIsVisible(true);
            } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                // Hide nav if scrolling down and not at top
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);

            // Active section tracking
            const sections = ["work", "about", "lab", "contact"];
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    // Use a larger offset for better accuracy
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleNavClick = (href: string) => {
        setIsMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-[#050505] border-b border-white/5 py-4"
            >
                <div className="max-w-[1800px] mx-auto px-[var(--gutter)] flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        className="group flex items-center gap-3"
                        whileHover={{ x: 4 }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    >
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[var(--accent-gold)] transition-colors">
                            <span className="font-editorial text-lg text-[var(--off-white)]">D</span>
                        </div>
                        <span className="hidden sm:block text-caption text-[var(--warm-gray)] group-hover:text-[var(--off-white)] transition-colors">
                            Developer
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        {navItems.map((item) => (
                            <Magnetic key={item.label}>
                                <motion.button
                                    onClick={() => handleNavClick(item.href)}
                                    className={`relative group flex items-baseline gap-2 ${activeSection === item.href.slice(1)
                                        ? "text-[var(--off-white)]"
                                        : "text-[var(--warm-gray)]"
                                        }`}
                                    whileHover={{ y: -2 }}
                                >
                                    <span className="text-[0.625rem] font-mono opacity-40">{item.number}</span>
                                    <span className="text-sm font-medium tracking-wide group-hover:text-[var(--off-white)] transition-colors">
                                        {item.label}
                                    </span>
                                    {activeSection === item.href.slice(1) && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-2 left-0 right-0 h-px bg-[var(--accent-gold)]"
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        />
                                    )}
                                </motion.button>
                            </Magnetic>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Magnetic strength={40}>
                            <motion.button
                                className="btn-editorial text-xs py-3 px-6"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleNavClick("#contact")}
                            >
                                <span>Get in Touch</span>
                            </motion.button>
                        </Magnetic>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden relative w-12 h-12 flex items-center justify-center border border-white/10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-5 h-4">
                            <motion.span
                                className="absolute left-0 w-full h-px bg-[var(--off-white)]"
                                animate={{
                                    top: isMenuOpen ? "50%" : "0%",
                                    rotate: isMenuOpen ? 45 : 0,
                                    y: isMenuOpen ? "-50%" : "0%",
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-[var(--off-white)]"
                                animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0 : 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="absolute left-0 w-full h-px bg-[var(--off-white)]"
                                animate={{
                                    bottom: isMenuOpen ? "50%" : "0%",
                                    rotate: isMenuOpen ? -45 : 0,
                                    y: isMenuOpen ? "50%" : "0%",
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-40 bg-[#050505] md:hidden"
                    >
                        {/* Menu Content */}
                        <div className="absolute inset-0 flex flex-col justify-center px-[var(--gutter)]">
                            {navItems.map((item, i) => (
                                <motion.button
                                    key={item.label}
                                    onClick={() => handleNavClick(item.href)}
                                    className="group py-6 border-b border-white/5 text-left w-full"
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                                >
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-caption text-[var(--warm-gray)]">{item.number}</span>
                                        <span className="font-editorial text-5xl text-[var(--off-white)] group-hover:text-[var(--accent-gold)] transition-colors">
                                            {item.label}
                                        </span>
                                    </div>
                                </motion.button>
                            ))}

                            {/* Mobile footer */}
                            <motion.div
                                className="absolute bottom-12 left-[var(--gutter)] right-[var(--gutter)]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="flex items-center justify-between text-caption text-[var(--warm-gray)]">
                                    <span>Portfolio 2026</span>
                                    <span>Available for work</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
