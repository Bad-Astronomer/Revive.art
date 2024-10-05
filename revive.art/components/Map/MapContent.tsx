import MapCard from "./MapCard";

import image1 from "@/public/images/image-1.jpeg";
import image2 from "@/public/images/image-2.jpeg";
import image3 from "@/public/images/image-3.jpeg";
import image4 from "@/public/images/image-4.jpeg";
import image5 from "@/public/images/image-5.jpeg";
import image6 from "@/public/images/image-6.jpeg";


type MapContentProps = {
    slideHeight: number,
}

export default function MapContent({slideHeight}: MapContentProps) {
    const cardCords = [
        [ 1, 5, 6, 8],
        [ 9, 2, 6, 8],
        [ 17, 6, 6, 8],
        [ -7, 1, 6, 8],
        [ -15, 6, 6, 8],
        [ -23, 3, 6, 8],
    ]
    const images = [image1, image2, image3, image4, image5, image6];

    // * Map Content
    const calcCardCords = (ijwh: number[]) => {
        const xywh: number[] = [0, 0, 0, 0]
        const unit = slideHeight/16;

        ijwh.forEach((value, index) => {
            xywh[index] = value * unit;
        })
        
        return xywh;
    }

    return (
        <>
            {cardCords.map((cord: number[], index: number) => {
                const cardCordsStyle = calcCardCords(cord);
                return (
                    <MapCard key={index} index={index} cardCordsStyle={cardCordsStyle} images={images}/>
                );
            })}
        </>
    )
}