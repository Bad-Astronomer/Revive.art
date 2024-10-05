import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";


type MapCardProps = {
    index: number,
    cardCordsStyle: number[],
    images: StaticImageData[],
}

export default function MapCard({index, cardCordsStyle, images}: MapCardProps) {
    return (
        <motion.div
            className="map-content-card aspect-square bg-black absolute z-10"
            style={{
                right: `${cardCordsStyle[0]}px`,
                top: `${cardCordsStyle[1]}px`,
                width: `${cardCordsStyle[2]}px`,
                height: `${cardCordsStyle[3]}px`,
            }}
        >
            <Image
                className="map-content-image"
                src={images[index]}
                alt="Map Content"
                width={cardCordsStyle[2] * 2}
                height={cardCordsStyle[3] * 2}
            />
        </motion.div>
    )
}