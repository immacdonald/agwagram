import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Card, { CardSize } from "./Card";
import style from "./Card.module.scss";
import { AnalysisContext } from "../../contexts/AnalysisContext";
import Button from "../Input/Button";

interface GridCardProps {
    title: string;
    icon: ReactNode;
    data: any;
}

/*const symbolColors: Record<string, string> = {
    'P': '#a0634a',
    'p': '#00baaf',
    'R': '#7689d6',
    'r': '#e8a169',
    'T': '#fafa70',
    'π': '#6ac982',
    'ρ': '#c0aa37',
    // Pauses
    '□': '#a1113e',
    '⚀': '#af458d',
    '⚁': '#a960b0',
    '⚂': '#9d7ace',
    '⚃': '#8d92e4',
    '⚄': '#7ca9f2',
    '⚅': '#70d1fa'
}*/

const symbolColors: Record<string, string> = {
    'P': '#000000',
    'p': '#5fcecf',
    'R': '#000000',
    'r': '#ea3323',
    'T': '#48752c',
    'π': '#ea33f7',
    'ρ': '#f9da78',
    // Pauses
    '□': '#ffffff',
    '⚀': '#b7b7b7',
    '⚁': '#b7b7b7',
    '⚂': '#8a8a8a',
    '⚃': '#8a8a8a',
    '⚄': '#636363',
    '⚅': '#636363'
}

const GridCard: React.FC<GridCardProps> = ({
    title,
    icon,
    data,
}: GridCardProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);

    const fixedLinkedData: any = []
    data.forEach((datum: any) => {
        if (datum.action.length > 1) {
            fixedLinkedData.push({ ...datum, action: datum.action[0] })
            fixedLinkedData.push({ ...datum, action: datum.action[1] })
        } else {
            fixedLinkedData.push({ ...datum, action: datum.action[0] })
        }
    })
    //const chars = bloc.split("");
    //const filteredChars = chars.filter(char => char !== ' ' && char !== '|');

    const ref = useRef<any>();
    const gridRef = useRef<any>();

    const [height, setHeight] = useState<number>(0);
    const [scale, setScale] = useState<number>(1);

    const gridSize = Math.ceil(Math.sqrt(fixedLinkedData.length));

    const gridItems: any[] = [];
    for (let row = 0; row < gridSize - 1; row++) {
        const startIndex = row * gridSize;
        const endIndex = startIndex + gridSize;
        const rowData = fixedLinkedData.slice(startIndex, endIndex);

        gridItems.push(`${(rowData[0].created_at as string).split("@")[0].trim()}`);
        gridItems.push(...rowData);
    }

    useEffect(() => {
        const scale = (ref.current?.clientWidth || 1) / (gridRef.current?.clientWidth || 1);
        const theoreticalHeight = gridSize * 24;

        //console.log("Grid size", gridSize, "theoretical height", theoreticalHeight, "Scale", scale)

        setHeight(theoreticalHeight * scale);
        setScale(scale);
        //console.log(ref.current?.offsetWidth)
    }, []);

    const controlProperties = { "--v-height": `${height}px` } as React.CSSProperties;

    const legend: { symbol: string, color: string }[] = [];
    for (const [key, value] of Object.entries(symbolColors)) {
        legend.push({ symbol: key, color: value });
    }

    return (
        <Card title={title} icon={icon} size={CardSize.Full}>
            <div className={style.legend}>
                <div className={style.legendList}>
                    {legend.map((item) => {
                        return (
                            <div className={style.legendKey} key={item.symbol}>
                                <span style={{ backgroundColor: item.color }}></span>
                                {item.symbol}
                            </div>
                        );
                    })}
                </div>
            </div>
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
                                <TransformComponent>
                                    <div ref={gridRef} className={style.grid} style={{ gridTemplateColumns: `repeat(${gridSize + 1}, 1fr)`, width: (gridSize * 24 + 150) }}>
                                        {gridItems.map((item, index) => {
                                            if (index % (gridSize + 1) == 0) {
                                                return (
                                                    <div className={style.label} key={index}>
                                                        {item}
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className={style.item} key={index} style={{ backgroundColor: `${symbolColors[item.action]}` }} data-title={`${symbolToDefinition(item.action)}\n${item.created_at}`}>
                                                        {item.action}
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </TransformComponent>
                                <div className={style.tools}>
                                    <Button onClick={() => zoomIn()} label="+" visual="filled"/>
                                    <Button onClick={() => zoomOut()} label="-" visual="filled"/>
                                    <Button onClick={() => resetTransform()} label="X" visual="filled"/>
                                </div>
                            </div>
                        )
                    }}
                </TransformWrapper>
            </div>
        </Card>
    );
};

export default GridCard;