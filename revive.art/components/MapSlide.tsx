"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import map_compass from "@/public/images/map_compass.png";
import map_grid from "@/public/images/map_grid.png";


function MapContentLeft(){
    return(
        <>
            <>
                <div className="map-content h-[calc(100%/16)] aspect-square bg-red-200 absolute bottom-0 right-0"></div>
            </>
        </>
    )
}

function MapContentCenter(){
    return(
        <>
            <>
                <div className="map-content h-[calc(100%/16)] aspect-square bg-red-200 absolute top-0"></div>
                <div className="map-content h-[calc(100%/16)] aspect-square bg-red-200 absolute bottom-0 right-0"></div>
            </>
        </>
    )
}

function MapContentRight(){
    return(
        <>
            <>
                <div className="map-content h-[calc(100%/16)] aspect-square bg-red-200 absolute top-0"></div>
            </>
        </>
    )
}


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

    const translateX = -((mouseX / window.innerWidth) * 50);

    return (
        <motion.div
        id="map-slide"
        className="absolute inset-0"
        animate={{ x: `${translateX}vw` }}
        transition={{ type: "tween", ease: [0.15, 1, 1, 1], duration: 2 }}
        >
        <div className="map-grid w-[150vw] p-[10vw 0] m-auto h-full flex">
            <div
            className="map-side flex-1 relative"
            style={{
                backgroundImage: `url(${map_grid.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
            }}
            >
                <MapContentLeft />
            </div>
            <div
            className="map-center flex-1 relative"
            style={{
                backgroundImage: `url(${map_grid.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
            }}
            >
                <MapContentCenter />
            </div>
            <div
            className="map-side flex-1 relative:"
            style={{
                backgroundImage: `url(${map_grid.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
            }}
            >
                <MapContentRight />
            </div>
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
