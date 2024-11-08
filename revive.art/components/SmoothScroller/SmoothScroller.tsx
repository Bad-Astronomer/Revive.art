"use client";
import { ReactNode ,useEffect, useRef } from "react";
import { useMotionValue, animate } from "framer-motion";


export default function SmoothScroller({ children }: { children: ReactNode }) {
    const scrollY = useMotionValue(0);
    const scrollVelocity = useRef(0); 
    const lastScrollPos = useRef(0); 

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const { deltaY } = event;
        scrollVelocity.current += deltaY * 0.15;
        };

        const updateScroll = () => {
        lastScrollPos.current += scrollVelocity.current;

        // Boundary Checks
        lastScrollPos.current = Math.max(lastScrollPos.current, 0);
        lastScrollPos.current = Math.min(lastScrollPos.current, document.body.scrollHeight - window.innerHeight);

        animate(scrollY, lastScrollPos.current, { damping: 500 });

        scrollVelocity.current *= 0.75;

        window.scrollTo(0, scrollY.get());
        requestAnimationFrame(updateScroll);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        updateScroll();

        return () => {
        window.removeEventListener('wheel', handleWheel);
        };
    }, [scrollY]);

    return <>{children}</>;
}