"use client";
import Crt from "@/components/Crt/Crt";
import Map from "@/components/Map/Map";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-center bg-background text-foreground">
      <Crt></Crt>
      <div className={`relative top-0 text-center text-[1.5em] w-full text-neutral-400`}> Were you able to recognize our planet? <br/> Color Matters</div>
      <div className="py-12">
        <Map></Map>
      </div>
    </main>
  );
}
