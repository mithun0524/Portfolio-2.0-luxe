"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Standard Lenis configuration for optimal performance
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Use requestAnimationFrame to link Lenis to the browser's refresh rate
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Expose lenis to window for usage in other components (if needed)
        if (typeof window !== "undefined") {
            (window as unknown as { lenis: Lenis }).lenis = lenis;
        }

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
