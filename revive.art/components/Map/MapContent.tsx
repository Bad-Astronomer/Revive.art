
type MapContentProps = {
    slideHeight: number,
    cardCords: number[][]
}

export default function MapContent({slideHeight, cardCords}: MapContentProps) {
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
                    <div
                        key={index}
                        className="map-content-card aspect-square bg-black absolute z-10"
                        style={{
                            right: `${cardCordsStyle[0]}px`,
                            top: `${cardCordsStyle[1]}px`,
                            width: `${cardCordsStyle[2]}px`,
                            height: `${cardCordsStyle[3]}px`,
                        }}
                    ></div>
                );
            })}
        </>
    )
}