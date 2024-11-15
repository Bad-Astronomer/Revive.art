"use client";

import MapContent from "./MapContent";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import map_compass from "@/public/images/map_compass.png";
import map_grid from "@/public/images/map_grid.png";
import "@/app/globals.css";



type MapSlideProps = {
    slideHeight: number,
    slideWidth: number
}


export default function MapSlide({slideHeight, slideWidth}: MapSlideProps) {

    // * Slide Logic
    const slideRef = useRef<HTMLDivElement>(null);

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

    const [windowlen, setwindowlen] = useState(window.innerWidth);
    const [mouseX, setMouseX] = useState(windowlen/2); 

    useEffect(() => {
        const slide = slideRef.current;
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
        };
        slide?.addEventListener("mousemove", handleMouseMove);
        
        const handleMouseOut = () => {
            setMouseX(window.innerWidth/2);
        };
        slide?.addEventListener("mouseleave", handleMouseOut);

        return () => {
            slide?.removeEventListener("mousemove", handleMouseMove);
            slide?.removeEventListener("mouseleave", handleMouseOut);
        };
    }, [mouseX, slideRef]);

    useEffect(() => {
        const handleResize = () => {
            setwindowlen(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowlen]);

    const offset = slideWidth - windowlen;
    const translateX = normalize(mouseX, 0, windowlen, 0, offset);
    
    return (
        <motion.div
            id="map-slide"
            className="absolute inset-0"
            animate={{ x: `-${translateX}px` }}
            transition={{ type: "tween", ease: [0.2, 1, 1, 1], duration: 2 }}
            ref={slideRef}
        >
        
        <div className="map-grid m-auto h-full flex" style={{width: `${slideWidth}px`}}>
            
            <div
            className="flex-1 relative"
            style={{
                backgroundImage: `url(${map_grid.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right top",
            }}
            >
                <MapContent slideHeight={slideHeight}/>
            </div>
            <div
            className="flex-1 relative"
            style={{
                backgroundImage: `url(${map_grid.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left top",
            }}
            ></div>
        
        </div>

        <div
            className="map-compass absolute bottom-0 my-2 h-[30px]"
            style={{
                width: `${slideWidth}px`,
                backgroundImage: `url(${map_compass.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(1.15)",
            }}
        ></div>

        </motion.div>
    );
}
