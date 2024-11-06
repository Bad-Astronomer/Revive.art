"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, easeIn } from "framer-motion";

export default function Home() {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll();

  const top = useTransform(scrollYProgress, [0.5, 1], ["220px", "0px"], { ease: easeIn });
  const left = useTransform(scrollYProgress, [0.5, 1], ["460px", "0px"], { ease: easeIn });
  const width = useTransform(scrollYProgress, [0.5, 1], ["510px", `${windowSize[0]}px`], { ease: easeIn });
  const height = useTransform(scrollYProgress, [0.5, 1], ["370px", `${windowSize[1]}px`], { ease: easeIn });

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="crt-effect-container h-full w-full fixed z-0 top-0 left-0"></div>

      <div className="crt-tv-container isolate relative h-[200vh]">
        <div className="w-full h-[50vh]">
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
            className="crt-screen-container"
            style={{ top, left, width, height }}
          />
        </div>
      </div>
    </main>
  );
}
