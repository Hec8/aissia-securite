'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

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
    once = false
}: RotateAnimationProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, rotate: degrees, scale: 0.95 }}
            animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: degrees, scale: 0.95 }}
            transition={{
                duration: 1.2,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
