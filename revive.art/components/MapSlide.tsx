"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import map_compass from "@/public/images/map_compass.png";
import map_grid from "@/public/images/map_grid.png";

export default function MapSlide() {
    const [mouseX, setMouseX] = useState(0);

    // Capture the mouse movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
        setMouseX(e.clientX); // Track mouse X position
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Interpolate mouse position to -30vw to 30vw
    const translateX = -((mouseX / window.innerWidth) * 50); // Range 0vw to 60vw

    return (
        <motion.div
        id="map-slide"
        className="absolute inset-0"
        // Animate the x translation based on mouse position
        animate={{ x: `${translateX}vw` }}
        transition={{ type: "tween", ease: [0.15, 1, 1, 1], duration: 2 }} // Smooth transition
        >
        <div className="map-grid w-[150vw] p-[10vw 0] m-auto h-full flex">
            <div
            className="map-side flex-1"
            style={{
                backgroundImage: `url(${map_grid.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
            ></div>
            <div
            className="map-center flex-1"
            style={{
                backgroundImage: `url(${map_grid.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
            ></div>
            <div
            className="map-side flex-1"
            style={{
                backgroundImage: `url(${map_grid.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
            ></div>
        </div>

        <div
            className="map-compass absolute w-[150vw] bottom-0 my-2 h-[30px]"
            style={{
            backgroundImage: `url(${map_compass.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        ></div>

        </motion.div>
    );
}
