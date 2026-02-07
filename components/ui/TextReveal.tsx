"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePreloader } from "@/app/PreloaderContext";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
    type?: "words" | "characters";
}

export default function TextReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    type = "words",
}: TextRevealProps) {
    const ref = useRef(null);
    const { isPreloaderComplete } = usePreloader();
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    // Only animate after preloader is complete AND element is in view
    const shouldAnimate = isPreloaderComplete && isInView;

    const words = children.split(" ");

    // Default animation for slide-up reveal
    const slideUp: any = {
        hidden: { y: "100%", opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: delay + i * 0.05,
                duration: duration,
                ease: [0.2, 0.65, 0.3, 0.9], // Custom cubic-bezier for "premium" feel
            },
        }),
    };

    if (type === "characters") {
        const characters = children.split("");
        return (
            <span ref={ref} className={`inline-block ${className}`}>
                {characters.map((char, i) => (
                    <span
                        key={i}
                        className="inline-block relative z-0 overflow-visible align-bottom py-2"
                        style={{ minWidth: char === " " ? "0.25em" : "auto" }}
                    >
                        <motion.span
                            variants={slideUp}
                            initial="hidden"
                            animate={shouldAnimate ? "visible" : "hidden"}
                            custom={i}
                            className="inline-block relative z-0"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    </span>
                ))}
            </span>
        );
    }

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom mr-[0.2em] last:mr-0 py-2"
                >
                    <motion.span
                        variants={slideUp}
                        initial="hidden"
                        animate={shouldAnimate ? "visible" : "hidden"}
                        custom={i}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
