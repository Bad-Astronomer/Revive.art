"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, easeIn } from "framer-motion";

export default function Home() {
  const [windowlen, setwindowlen] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
      const handleResize = () => {
          setwindowlen([window.innerHeight, window.innerWidth]);
      };
      window.addEventListener("resize", handleResize);
      return () => {
          window.removeEventListener("resize", handleResize);
      };
  }, [windowlen]);

  const { scrollYProgress } = useScroll();

  // Applying transforms with ease
  const top = useTransform(scrollYProgress, [0, 1], ["220px", "0px"], { ease: easeIn });
  const left = useTransform(scrollYProgress, [0, 1], ["460px", "0px"], { ease: easeIn });
  const width = useTransform(scrollYProgress, [0, 1], ["510px", `${windowlen[0]}px`], { ease: easeIn });
  const height = useTransform(scrollYProgress, [0, 1], ["370px", `${windowlen[1]}px`], { ease: easeIn });

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="crt-effect-container h-fit pt-80">
        <div className="crt-tv-container relative isolate">
          <Image className="m-auto" src="/images/crt.png" alt="image-1" width={1920} height={1080} />
          
          <motion.div
            className="crt-screen-container"
            style={{ "top": top, "left": left, "width": width, "height": height }}
          />
        </div>
      </div>
    </main>
  );
}
