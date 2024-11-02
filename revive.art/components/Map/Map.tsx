"use client";

import map_bg from "@/public/images/map_bg.png";
import MapSlide from "@/components/Map/MapSlide";
import map_needle from "@/public/images/map_needle.svg";
import Image from "next/image";


export default function Map() {
    const slideHeight: number = 680;
    const slideWidth: number = 2400;

    return (
        <div
            className="map-container w-full relative isolate overflow-x-hidden"
            style={{
                backgroundImage: `url(${map_bg.src})`,
                backgroundSize: "cover",
                minHeight: `${slideHeight}px`,
            }}
        >
            <MapSlide slideHeight={slideHeight} slideWidth={slideWidth} />
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

            {/* // TODO: Add Noise Background */}
            <div className="w-full h-full absolute inset-0 -z-10"
            style={{
                backdropFilter: "brightness(0.8)",
            }}
            ></div>
        </div>
    )
}