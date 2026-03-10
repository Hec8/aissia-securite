'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScaleAnimationProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function ScaleAnimation({ children, delay = 0, className = '' }: ScaleAnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
