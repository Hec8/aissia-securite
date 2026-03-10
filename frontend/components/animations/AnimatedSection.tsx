'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    once?: boolean;
}

const directionVariants: Record<string, Variants> = {
    up: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    },
    down: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
    },
    left: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    },
    right: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    },
    none: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }
};

export const AnimatedSection = ({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    once = false
}: AnimatedSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={directionVariants[direction]}
            transition={{
                duration: 1,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
}

export const StaggerContainer = ({
    children,
    className = '',
    staggerDelay = 0.1,
    once = false
}: StaggerContainerProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.2
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export const StaggerItem = ({
    children,
    className = '',
    direction = 'up'
}: StaggerItemProps) => {
    const itemVariants: Record<string, Variants> = {
        up: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        },
        down: {
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 }
        },
        left: {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
        },
        right: {
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        }
    };

    return (
        <motion.div
            variants={itemVariants[direction]}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface ScaleAnimationProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    scale?: number;
    once?: boolean;
}

export const ScaleAnimation = ({
    children,
    className = '',
    delay = 0,
    scale = 0.9,
    once = false
}: ScaleAnimationProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
            transition={{
                duration: 1.1,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface RotateAnimationProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    degrees?: number;
    once?: boolean;
}

export const RotateAnimation = ({
    children,
    className = '',
    delay = 0,
    degrees = -5,
    once = true
}: RotateAnimationProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, rotate: degrees, scale: 0.95 }}
            animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: degrees, scale: 0.95 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface ParallaxProps {
    children: ReactNode;
    className?: string;
    offset?: number;
}

export const Parallax = ({
    children,
    className = '',
    offset = 50
}: ParallaxProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            style={{
                y: isInView ? 0 : offset
            }}
            transition={{
                duration: 0.8,
                ease: 'easeOut'
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
