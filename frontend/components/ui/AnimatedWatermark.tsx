'use client';

import { motion } from 'framer-motion';

export const AnimatedWatermark = () => {
    const watermarks = [
        { top: '10%', left: '5%', delay: 0, duration: 14 },
        { top: '25%', right: '8%', delay: 2, duration: 16 },
        { top: '45%', left: '3%', delay: 4, duration: 15 },
        { top: '65%', right: '5%', delay: 1, duration: 17 },
        { top: '80%', left: '10%', delay: 3, duration: 14 },
        { top: '15%', right: '15%', delay: 5, duration: 16 },
        { top: '55%', left: '12%', delay: 2.5, duration: 15 },
        { top: '75%', right: '12%', delay: 4.5, duration: 17 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {watermarks.map((position, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        top: position.top,
                        left: position.left,
                        right: position.right,
                    }}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{
                        opacity: [0.06, 0.10, 0.06],
                        scale: [0.8, 1, 0.8],
                        rotate: [-10, 10, -10],
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                    }}
                    transition={{
                        duration: position.duration,
                        repeat: Infinity,
                        delay: position.delay,
                        ease: 'easeInOut',
                    }}
                >
                    {/* Shield icon */}
                    <svg
                        className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 text-[var(--primary)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                </motion.div>
            ))}

            {/* Additional lock icons for variety */}
            {[
                { top: '20%', left: '50%', delay: 1.5, duration: 12 },
                { top: '40%', right: '20%', delay: 3.5, duration: 14 },
                { top: '70%', left: '40%', delay: 2.2, duration: 13 },
                { top: '35%', left: '25%', delay: 4.8, duration: 15 },
            ].map((position, index) => (
                <motion.div
                    key={`lock-${index}`}
                    className="absolute"
                    style={{
                        top: position.top,
                        left: position.left,
                        right: position.right,
                    }}
                    initial={{ opacity: 0, scale: 0.9, rotate: 15 }}
                    animate={{
                        opacity: [0.06, 0.10, 0.06],
                        scale: [0.9, 1.1, 0.9],
                        rotate: [15, -15, 15],
                        x: [0, 20, 0],
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: position.duration,
                        repeat: Infinity,
                        delay: position.delay,
                        ease: 'easeInOut',
                    }}
                >
                    {/* Lock icon */}
                    <svg
                        className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 text-[var(--secondary)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};
