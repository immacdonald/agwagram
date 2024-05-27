import { Button, Card, Dropdown, Popover, Recenter, ZoomIn, ZoomOut, useResponsiveContext } from '@imacdonald/phantom';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useGetSymbolsQuery } from '../../data/apiSlice';
import { Dataset } from '../../icons';
import Toggle from '../Input/Toggle';
import style from './GridViewCard.module.scss';
import { formatDate } from '../../utility';

interface GridViewCardProps {
	title: string;
	username: string;
	data: any;
}

const actionLegend: Record<string, string> = {
	P: '#84f460',
	p: '#5fcecf',
	R: '#FFA500',
	r: '#ea3323',
	T: '#48752c',
	π: '#ea33f7',
	ρ: '#f9da78'
};

const contentLegend: Record<string, string> = {
	E: '#5fcecf',
	H: '#ea3323',
	m: '#84f460',
	U: '#ea33f7',
	t: '#f9da78',
	q: '#48752c'
};

const pauseLegend: Record<string, string> = {
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
		const actionLinkedData: any = [];
		const contentLinkedData: any = [];

		data.forEach((datum: any) => {
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
	}, []);

	const [showAction, setShowAction] = useState<boolean>(true);
	const toggleShowAction = (value: string) => {
		if (value == 'Action') {
			setShowAction(true);
		} else {
			setShowAction(false);
		}
	};

	const fixedLinkedData = showAction ? actionLinkedData : contentLinkedData;
	//console.log(fixedLinkedData);

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

		gridItems.push(`${new Date(rowData[0].created_at * 1000).toLocaleDateString()}`);
		gridItems.push(...rowData);
	}

	const { windowSize } = useResponsiveContext();

	useEffect(() => {
		const scale = (ref.current?.clientWidth || 1) / (gridRef.current?.clientWidth || 1);
		const theoreticalHeight = gridSize * 24;
		setHeight(theoreticalHeight * scale);
		setScale(scale);
	}, [fixedLinkedData.length, windowSize]);

	const controlProperties = { '--v-height': `${height}px` } as React.CSSProperties;

	const combinedLegend = { ...(showAction ? actionLegend : contentLegend), ...pauseLegend };
	const legend: { symbol: string; color: string }[] = [];
	for (const [key, value] of Object.entries(combinedLegend)) {
		legend.push({ symbol: key, color: value });
	}

	const { data: symbols } = useGetSymbolsQuery();

	const symbolToDefinition = (bloc: string) => {
		if (!symbols) {
			return '';
		}

		const definitions = [...bloc].map((c) => symbols[c]);
		return definitions.join(', ');
	};

	const [showDates, setShowDates] = useState<boolean>(false);
	const toggleShowDates = () => {
		setShowDates(!showDates);
	};

	const routeToTweet = (id: string) => {
		const url = `https://twitter.com/${username}/status/${id}`;
		window.open(url, '_blank');
	};

	const createItemSquare = (item: any, index: number): React.ReactNode => {
		//console.log(Object.keys(pauseLegend));
		const popoverContent = (
			<div className={style.popoverContent}>
				{Object.keys(pauseLegend).includes(item.content) ? (
					<h3>{symbolToDefinition(item.content)}</h3>
				) : (
					<>
						<h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span>{symbolToDefinition(item.content)}</span>
							<span>{formatDate(new Date(item.created_at * 1000), true)}</span>
						</h3>
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
				anchorProps={{ style: { backgroundColor: `${combinedLegend[item.content] ?? 'white'}` }, onClick: () => routeToTweet(item.id) }}
				customStyle={style.popover}
			>
				{showDates && <em>{item.content}</em>}
			</Popover>
		);
	};

	return (
		<Card fullHeight>
			<Card.Header title={title} subtitle="View the BLOC data as a grid to easily analyze trends and patterns" Icon={Dataset} />
			<Card.Body>
				<div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '12px' }}>
					<span style={{ width: 'min(calc(90% - 150px), 600px)' }}>
						<Dropdown options={['Action', 'Content Syntactic']} isClearable={false} onChange={(v) => toggleShowAction(v as string)} defaultValue="Action" />
					</span>
					<span>
						Show Labels <Toggle state={showDates} onChange={() => toggleShowDates()} />
					</span>
				</div>
				<div className={style.legend}>
					<div className={style.legendList}>
						{legend.map((item) => {
							return (
								<div className={style.legendKey} key={item.symbol}>
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
											{gridItems.map((item, index) => {
												if (index % (gridSize + 1) == 0) {
													return (
														<div className={style.label} key={index}>
															{item}
														</div>
													);
												} else {
													return createItemSquare(item, index);
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

export default GridViewCard;
