"use-client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="crt-effect-container h-fit pt-80">

        <div className="crt-tv-container relative isolate">
          <Image className="m-auto" src="/images/crt.png" alt="image-1" width={1920} height={1080}/>
          <div className="crt-screen-container"></div>
        </div>
      </div>
    </main>
  );
}
