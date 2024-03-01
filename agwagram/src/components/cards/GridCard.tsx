import { ReactNode, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Card, { CardSize } from "./Card";
import style from "./Card.module.scss";

interface GridCardProps {
    title: string;
    icon: ReactNode;
    bloc: string;
}

const symbolColors: { [key: string]: string } = {
    'P': '#51CDB9',
    'p': '#1A46F3',
    'R': '#42C640',
    'r': '#0347A9',
    'T': '#611290',
    'π': '#245DD4',
    'ρ': '#A33357',
    '□': '#6C6938',
    '⚀': '#87F008',
    '⚁': '#C58DC4',
    '⚂': '#F29ACA',
    '⚃': '#4B1F1B',
    '⚄': '#0284E8',
    '⚅': '#8CD78E'
}

const GridCard: React.FC<GridCardProps> = ({
    title,
    icon,
    bloc,
}: GridCardProps) => {
    const chars = bloc.split("");
    const filteredChars = chars.filter(char => char !== ' ' && char !== '|');

    const gridSize = Math.ceil(Math.sqrt(filteredChars.length));
    console.log("Length:", filteredChars.length, "Size:", gridSize);

    const gridItems: string[] = [];
    for (let row = 0; row < gridSize - 1; row++) {
        const startIndex = row * gridSize;
        const endIndex = startIndex + gridSize;
        const rowData = filteredChars.slice(startIndex, endIndex);

        gridItems.push(`Row ${row + 1}`);
        gridItems.push(...rowData);
    }

    const ref = useRef<any>();
    const gridRef = useRef<any>();
    const scale = (ref.current?.clientWidth || 1) / (gridRef.current?.clientWidth || 1);
    const theoreticalHeight = gridSize * 24;

    const controlProperties = {"--v-height": `${theoreticalHeight * scale * 1.05}px`} as React.CSSProperties;

    return (
        <Card title={title} icon={icon} size={CardSize.Full}>
            <div className={style.gridControl} style={controlProperties}>
            <TransformWrapper
                initialScale={scale}
                minScale={scale}
                maxScale={5}
                initialPositionX={0}
                initialPositionY={0}
            >
                {({ zoomIn, zoomOut, resetTransform, setTransform }) => {
                    setTransform(0, 0, scale);
                    return (
                        <div ref={ref} className={style.gridCard}>
                            <div className={style.tools}>
                                <button onClick={() => zoomIn()}>+</button>
                                <button onClick={() => zoomOut()}>-</button>
                                <button onClick={() => resetTransform()}>x</button>
                            </div>
                            <TransformComponent>
                                <div ref={gridRef} className={style.grid} style={{ gridTemplateColumns: `repeat(${gridSize + 1}, 1fr)` , width: (gridSize * 24 +  100)}}>
                                    {gridItems.map((item, index) => (
                                        <div className={index % (gridSize + 1) > 0 ? style.item : style.label} key={index} style={{ backgroundColor: `${symbolColors[item] || 'transparent'}` }}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </TransformComponent>
                        </div>
                    )
                }}
            </TransformWrapper>
            </div>
        </Card>
    );
};

export default GridCard;