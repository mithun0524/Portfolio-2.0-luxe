"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isLoupe, setIsLoupe] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        if (isMobile) return;

        const dot = dotRef.current;
        const ring = ringRef.current;

        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        let ringX = 0;
        let ringY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Add hover detection for interactive elements
        const addHoverListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, select, .cursor-hover'
            );
            const loupeElements = document.querySelectorAll('.cursor-loupe, img, video');

            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });

            loupeElements.forEach((el) => {
                el.addEventListener("mouseenter", () => setIsLoupe(true));
                el.addEventListener("mouseleave", () => setIsLoupe(false));
            });
        };

        // Animation loop
        const animate = () => {
            // Smooth follow for dot
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;

            // Slower follow for ring
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;

            if (dot) {
                dot.style.left = `${dotX}px`;
                dot.style.top = `${dotY}px`;
            }

            if (ring) {
                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;
            }

            requestAnimationFrame(animate);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        addHoverListeners();
        animate();

        // Re-add listeners on DOM changes
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", checkMobile);
            observer.disconnect();
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <motion.div
                        ref={dotRef}
                        className="cursor-dot"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: isHovering ? 0 : 1,
                            opacity: isHovering ? 0 : 1
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.div
                        ref={ringRef}
                        className={`cursor-ring ${isHovering ? "hover" : ""} ${isLoupe ? "loupe" : ""}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}
