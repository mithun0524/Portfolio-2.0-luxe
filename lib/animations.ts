// Framer Motion animation variants for reuse across components

export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

// Magnetic hover effect for interactive elements
export const calculateMagneticPosition = (
    e: React.MouseEvent<HTMLElement>,
    strength: number = 0.3
) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    return { x: deltaX, y: deltaY };
};

// Tilt effect for cards
export const calculateTilt = (
    e: React.MouseEvent<HTMLElement>,
    maxTilt: number = 10
) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;
    return { rotateX, rotateY };
};

// Scroll progress helper
export const getScrollProgress = (
    start: number,
    end: number,
    scrollY: number
): number => {
    if (scrollY < start) return 0;
    if (scrollY > end) return 1;
    return (scrollY - start) / (end - start);
};
