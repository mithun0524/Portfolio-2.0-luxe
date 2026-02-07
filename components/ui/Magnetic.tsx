"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticProps {
    children: React.ReactElement;
    strength?: number; // How far it can move (default: 30)
}

export default function Magnetic({ children, strength = 30 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX, y: middleY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    // Spring physics configuration
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };

    // Smooth out the raw mouse values
    const motionX = useSpring(x, springConfig);
    const motionY = useSpring(y, springConfig);

    // Map the smoothed values to the transform range
    const transformX = useTransform(motionX, [-strength * 5, strength * 5], [-strength, strength]);
    const transformY = useTransform(motionY, [-strength * 5, strength * 5], [-strength, strength]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: transformX, y: transformY }}
            className="w-fit h-fit"
        >
            {children}
        </motion.div>
    );
}
