import map_bg from "@/public/images/map_bg.png";
import MapSlide from "@/components/MapSlide";
import map_needle from "@/public/images/map_needle.svg";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div
        className="map-container w-full min-h-[680px] relative isolate"
        style={{
          backgroundImage: `url(${map_bg.src})`,
          backgroundSize: "cover",
        }}
      >
        <MapSlide />
        <div
            className="absolute bottom-0 w-[50px] h-[50px] left-[50%] translate-x-[-50%] opacity-70"
            style={{
                mixBlendMode: "difference", // Invert background behind needle
            }}
        >
            <Image
                src={map_needle}
                alt="Map Needle"
                width={50}
                height={50}
                style={{
                    transform: "scaleX(0.4) scaleY(0.8)",
                    transformOrigin: "bottom",
                }}
            />
        </div>

        
      </div>
    </main>
  );
}
