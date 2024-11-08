"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, easeIn } from "framer-motion";
import { Press_Start_2P } from "next/font/google";


const press_start_2p = Press_Start_2P({
    weight: ['400'],
    subsets: ['latin'],
});


export default function Crt() {
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const crtContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll({target: crtContainerRef});

    const start_keyframe = 0.4;
    const mid_keyframe = 0.8;
    const end_keyframe = 1;

    const top = useTransform(scrollYProgress, [start_keyframe, mid_keyframe], ["220px", "0px"], { ease: easeIn });
    const left = useTransform(scrollYProgress, [start_keyframe, mid_keyframe], ["455px", "0px"], { ease: easeIn });
    const width = useTransform(scrollYProgress, [start_keyframe, mid_keyframe], ["520px", `${windowSize[0]}px`], { ease: easeIn });
    const height = useTransform(scrollYProgress, [start_keyframe, mid_keyframe], ["380px", `${windowSize[1]}px`], { ease: easeIn });
    const color = useTransform(scrollYProgress, [start_keyframe, end_keyframe], ["saturate(0) contast(0.75) blur(0px)", "saturate(1) contrast(1.5) blur(0px)"], { ease: easeIn });
    const opacity = useTransform(scrollYProgress, [mid_keyframe, end_keyframe], ["0", "1"], { ease: easeIn });
    const border = useTransform(scrollYProgress, [start_keyframe, mid_keyframe], ["1em", "0em"], { ease: easeIn });

    return (
        <div className={"relative h-[200vh] isolate"} ref={crtContainerRef}>
            <div className="absolute h-full w-full top-0">
                <div className="crt-effect-container h-screen w-screen sticky z-0 top-0 left-0"></div>
            </div>
            <div className="w-full h-[40vh]">
                <div className={`home-header ${press_start_2p.className}`}>Revive<span className="highlight">.art</span></div>
            </div>
            <div className="sticky top-0 w-screen h-screen">
            <Image
                className="m-auto"
                src="/images/crt.png"
                alt="CRT TV"
                width={windowSize[0]}
                height={windowSize[1]}
            />
            <motion.div
                className="crt-screen-container overflow-hidden relative"
                style={{ top, left, width, height, filter: color, borderRadius: border }}
            >
                <div className="relative h-full w-full">
                    <Image
                        className="relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10 max-h-[800px] max-w-[800px] w-full aspect-square" 
                        src="/images/Apollo_11_Earth.jpg"
                        alt="Earth"
                        width={2000}
                        height={2000}
                    />
                </div>
            </motion.div>
            <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{ background: "linear-gradient(to bottom, transparent 30%, var(--background) 100%)", opacity }}
            ></motion.div>
            </div>
        </div>
    )
}
