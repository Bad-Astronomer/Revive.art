"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import map_compass from "@/public/images/map_compass.png";
import map_grid from "@/public/images/map_grid.png";


function MapContentLeft(){
    return(
        <>
            <div className="map-content h-[calc(100%/16)] aspect-square bg-red-200 absolute bottom-0 right-0"></div>
        </>
    )
}

function MapContentCenter(){
    return(
        <>
            <div className="map-content h-[calc(100%/16)] aspect-square bg-red-200 absolute top-0"></div>
            <div className="map-content h-[calc(100%/16)] aspect-square bg-red-200 absolute bottom-0 right-0"></div>
        </>
    )
}

function MapContentRight(){
    return(
        <>
            <div className="map-content h-[calc(100%/16)] aspect-square bg-red-200 absolute top-0"></div>
        </>
    )
}


export default function MapSlide() {
    const cap = (value: number, min: number, max: number) => {
        value = Math.min(value, max);
        value = Math.max(value, min);
        return value;
    }

    const normalize = (value: number ,oldMin: number, oldMax: number,
            newMin: number, newMax: number, capToggle: boolean = true) => {
        
        value = (value - oldMin)/(oldMax - oldMin);
        value = (value * (newMax - newMin)) + newMin;
        if(capToggle){
            value = cap(value, newMin, newMax);
        }
        return value;
    }

    const [mouseX, setMouseX] = useState(0);
    const [windowlen, setwindowlen] = useState(window.innerWidth);

    useEffect(() => {
        const handleMouseOut = () => {
            setMouseX(window.innerWidth/2);
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
        };
        
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            console.log(mouseX);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseout", handleMouseOut);
        };

    }, [mouseX]);

    useEffect(() => {
        const handleResize = () => {
            setwindowlen(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("load", handleResize);
        };
    }, []);

    // const translateX = -((mouseX / window.innerWidth) * 50);
    // const translateX = 0;
    const offset = 2400 - windowlen;
    const translateX = normalize(mouseX, 0, windowlen, 0, offset);
    // const translateX = normalize(mouseX, 0, windowlen, -50, 50);
    console.log(translateX);

    return (
        <motion.div
        id="map-slide"
        className="absolute inset-0"
        animate={{ x: `-${translateX}px` }}
        transition={{ type: "tween", ease: [0.40, 1, 1, 1], duration: 2 }}
        >
        
        <div className="map-grid w-[2400px] p-[10vw 0] m-auto h-full flex">
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
            className="map-compass absolute w-[2400px] bottom-0 my-2 h-[30px]"
            style={{
            backgroundImage: `url(${map_compass.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        ></div>

        </motion.div>
    );
}
