// components/common/ScrollReveal.tsx
"use client"

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
}

export default function ScrollReveal({ children, delay = 0.2 }: ScrollRevealProps) {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6, delay }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
            }}
        >
            {children}
        </motion.div>
    );
}
