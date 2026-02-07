"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        const interval = setInterval(() => {
            setCounter((prev) => {
                const next = prev + Math.floor(Math.random() * 10) + 1;

                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        document.body.style.overflow = "";
                    }, 800);
                    return 100;
                }
                return next;
            });
        }, 150);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Counter */}
                    <div className="relative overflow-hidden">
                        <motion.span
                            className="font-editorial text-massive text-[var(--off-white)] leading-none tabular-nums block"
                            initial={{ y: 200 }}
                            animate={{ y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        >
                            {counter}
                        </motion.span>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute bottom-12 left-[var(--gutter)] right-[var(--gutter)] flex justify-between text-[var(--warm-gray)] text-caption">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Loading Portfolio
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            2026
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
