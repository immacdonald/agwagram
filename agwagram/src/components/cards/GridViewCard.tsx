import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Dataset, Dropdown, formatNumericDate, formatReadableDate, Popover, Recenter, Row, Switch, useResponsiveContext, ZoomIn, ZoomOut } from 'phantom-library';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useGetSymbolsQuery } from '@data/apiSlice';
import style from './GridViewCard.module.scss';

interface GridViewCardProps {
    title: string;
    username: string;
    data: LinkedData[];
}

interface GridLinkedData extends LinkedData {
    content: string;
}

type GridItemData = GridLinkedData | string;

type LegendKey = Record<string, string>;

const actionLegend: LegendKey = {
    P: '#84f460',
    p: '#5fcecf',
    R: '#FFA500',
    r: '#ea3323',
    T: '#48752c',
    π: '#ea33f7',
    ρ: '#f9da78'
};

const contentLegend: LegendKey = {
    E: '#5fcecf',
    H: '#ea3323',
    m: '#84f460',
    U: '#ea33f7',
    t: '#f9da78',
    q: '#48752c'
};

const pauseLegend: LegendKey = {
    '□': '#ffffff',
    '⚀': '#b7b7b7',
    '⚁': '#b7b7b7',
    '⚂': '#8a8a8a',
    '⚃': '#8a8a8a',
    '⚄': '#636363',
    '⚅': '#636363'
};

const GridViewCard: React.FC<GridViewCardProps> = ({ title, username, data }) => {
    const { actionLinkedData, contentLinkedData } = useMemo(() => {
        const actionLinkedData: GridLinkedData[] = [];
        const contentLinkedData: GridLinkedData[] = [];

        data.forEach((datum: LinkedData) => {
            if (datum.action.length > 1) {
                actionLinkedData.push({ ...datum, content: datum.action[0] });
                contentLinkedData.push({ ...datum, content: datum.action[0] });
                actionLinkedData.push({ ...datum, content: datum.action[1] });
                [...datum.content_syntactic].forEach((char) => {
                    contentLinkedData.push({ ...datum, content: char });
                });
            } else {
                actionLinkedData.push({ ...datum, content: datum.action[0] });
                [...datum.content_syntactic].forEach((char) => {
                    contentLinkedData.push({ ...datum, content: char });
                });
            }
        });

        return { actionLinkedData, contentLinkedData };
    }, [data]);

    // The card should never render if not enough action data is present
    if (actionLinkedData.length < 36) {
        return (
            <Card>
                <Card.Header title={title} Icon={Dataset} />
                <Card.Body>
                    <p>Cannot display grid for {actionLinkedData.length} data points.</p>
                </Card.Body>
            </Card>
        );
    }

    const [showAction, setShowAction] = useState<boolean>(true);
    const toggleShowAction = (value: string): void => {
        if (value == 'Action') {
            setShowAction(true);
        } else {
            setShowAction(false);
        }
    };

    const { data: symbols } = useGetSymbolsQuery();

    const ref = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const fixedLinkedData: GridLinkedData[] = useMemo(() => (showAction ? actionLinkedData : contentLinkedData), [showAction, data]);
    const gridSize: number = useMemo(() => Math.ceil(Math.sqrt(fixedLinkedData.length)), [fixedLinkedData]);

    const [height, setHeight] = useState<number>(0);
    const [scale, setScale] = useState<number>(1);

    const { windowSize } = useResponsiveContext();

    useEffect(() => {
        const scale = (ref.current?.clientWidth || 1) / (gridRef.current?.clientWidth || 1);
        const theoreticalHeight = gridSize * 24;
        setHeight(theoreticalHeight * scale);
        setScale(scale);
    }, [fixedLinkedData.length, windowSize]);

    const controlProperties = useMemo(() => ({ '--v-height': `${height}px` }) as React.CSSProperties, [height]);

    const [showLabels, setShowLabels] = useState<boolean>(false);

    const gridItems: GridItemData[] = [];

    // Grid size or grid size - 1? A problem for me tommorow
    for (let row = 0; row < gridSize; row++) {
        const startIndex: number = row * gridSize;
        const endIndex: number = startIndex + gridSize;
        const rowData: GridLinkedData[] = fixedLinkedData.slice(startIndex, endIndex);

        if (rowData[0]) {
            gridItems.push(`${formatNumericDate(Number(rowData[0].created_at) * 1000)}`);
            gridItems.push(...rowData);
        }
    }

    const combinedLegend = useMemo(() => ({ ...(showAction ? actionLegend : contentLegend), ...pauseLegend }), [fixedLinkedData]);

    const legend: { symbol: string; color: string }[] = [];
    for (const [key, value] of Object.entries(combinedLegend)) {
        legend.push({ symbol: key, color: value });
    }

    const usedSymbols = useMemo(
        () =>
            Array.from(
                new Set(
                    fixedLinkedData.flatMap((value: GridLinkedData) => {
                        return showAction ? [...value.action] : [...value.content];
                    })
                )
            ),
        [fixedLinkedData]
    );

    const symbolToDefinition = (bloc: string): string => {
        if (!symbols) {
            return '';
        }

        const definitions = [...bloc].map((c) => symbols[c]);
        return definitions.join(', ');
    };

    const routeToTweet = (id: string): void => {
        const url = `https://twitter.com/${username}/status/${id}`;
        window.open(url, '_blank');
    };

    const createItemSquare = (item: GridLinkedData, index: number): React.ReactNode => {
        const pause = Object.keys(pauseLegend).includes(item.content);
        const popoverContent = (
            <div className={style.popoverContent}>
                {pause ? (
                    <span className={style.title}>{symbolToDefinition(item.content)}</span>
                ) : (
                    <>
                        <Row align="space-between" className={style.title}>
                            <span>{symbolToDefinition(item.content)}</span>
                            <span style={{ fontSize: '1rem' }}>{formatReadableDate(new Date(Number(item.created_at) * 1000), true)}</span>
                        </Row>
                        <hr style={{ margin: '0.5rem 0' }} />
                        <span>{item.text}</span>
                    </>
                )}
            </div>
        );

        return (
            <Popover
                key={index}
                content={popoverContent}
                anchorClass={style.item}
                anchorProps={{ style: { backgroundColor: `${combinedLegend[item.content] ?? 'white'}` }, onClick: !pause ? (): void => routeToTweet(item.id) : undefined }}
                customStyle={style.popover}
            >
                {showLabels && <em>{item.content}</em>}
            </Popover>
        );
    };

    return (
        <Card fullHeight>
            <Card.Header title={title} subtitle="Explore patterns in behaviors." Icon={Dataset} />
            <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '12px' }}>
                    <span style={{ width: 'min(calc(90% - 150px), 600px)' }}>
                        <Dropdown
                            options={[
                                { label: 'Action', value: 'Action' },
                                { label: 'Content Syntactic', value: 'Content Syntactic' }
                            ]}
                            isClearable={false}
                            onChange={(v) => toggleShowAction(v as string)}
                            defaultValue="Action"
                        />
                    </span>
                    <span>
                        Labels <Switch state={showLabels} onChange={setShowLabels} />
                    </span>
                </div>
                <div className={style.legend}>
                    <div className={style.legendList}>
                        {legend.map((item) => {
                            return (
                                <div className={style.legendKey} key={item.symbol} style={!usedSymbols.includes(item.symbol) ? { opacity: '33%' } : undefined}>
                                    <span style={{ backgroundColor: item.color }}></span>
                                    <em>{item.symbol}</em>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={style.gridControl} style={controlProperties}>
                    <TransformWrapper initialScale={scale} minScale={scale - 0.25} maxScale={2} initialPositionX={0} initialPositionY={0}>
                        {({ zoomIn, zoomOut, resetTransform, setTransform }) => {
                            setTransform(0, 0, scale);
                            return (
                                <div ref={ref} className={style.gridCard}>
                                    <TransformComponent>
                                        <div ref={gridRef} className={style.grid} style={{ gridTemplateColumns: `repeat(${gridSize + 1}, 1fr)`, width: gridSize * 24 + 80 }}>
                                            {gridItems.map((item: GridItemData, index) => {
                                                if (index % (gridSize + 1) == 0) {
                                                    return (
                                                        <div className={style.label} key={index}>
                                                            {item as string}
                                                        </div>
                                                    );
                                                } else {
                                                    return createItemSquare(item as GridLinkedData, index);
                                                }
                                            })}
                                        </div>
                                    </TransformComponent>
                                    <div className={style.tools}>
                                        <Button onClick={() => resetTransform()} Icon={Recenter} rounded />
                                        <Button onClick={() => zoomOut()} Icon={ZoomOut} rounded />
                                        <Button onClick={() => zoomIn()} Icon={ZoomIn} rounded />
                                    </div>
                                </div>
                            );
                        }}
                    </TransformWrapper>
                </div>
            </Card.Body>
        </Card>
    );
};

export { GridViewCard };
