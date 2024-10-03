import map_bg from "@/public/images/map_bg.png";
import MapSlide from "@/components/MapSlide";
import map_needle from "@/public/images/map_needle.png";


export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div
        className="map-container w-[200vw] min-h-[680px] relative"
        style={{
          backgroundImage: `url(${map_bg.src})`,
          backgroundSize: "cover",
        }}
      >
        <MapSlide />
      
        <div
            className="absolute bottom-0 w-[20px] h-[50px] left-[50%] translate-x-[-50%] opacity-50"
            style={{
            backgroundImage: `url(${map_needle.src})`,
            backgroundSize: "cover",
            }}
        ></div>
      </div>
    </main>
  );
}
