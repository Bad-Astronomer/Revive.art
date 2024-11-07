"use client";
import Crt from "@/components/Crt/Crt";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function Home() {
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest/window.innerHeight)
  })

  return (
    <main className="min-h-screen items-center justify-center bg-background text-foreground">
      <Crt></Crt>
      <div className="h-screen w-screen"></div>
    </main>
  );
}
