import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useGetSymbolsQuery } from '../../data/apiSlice';
import Button from '../Input/Button';
import Dropdown from '../Input/Dropdown';
import Toggle from '../Input/Toggle';
import Card, { CardSize } from './Card';
import style from './Card.module.scss';

interface GridCardProps {
	title: string;
	icon: ReactNode;
	username: string;
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

const actionLegend: Record<string, string> = {
	P: '#000000',
	p: '#5fcecf',
	R: '#000000',
	r: '#ea3323',
	T: '#48752c',
	π: '#ea33f7',
	ρ: '#f9da78',
}

const contentLegend: Record<string, string> = {
	E: '#5fcecf',
	H: '#ea3323',
	m: '#5fcecf',
	U: '#ea33f7',
	t: '#f9da78',
	q: '#48752c',
}

const pauseLegend: Record<string, string> = {
	'□': '#ffffff',
	'⚀': '#b7b7b7',
	'⚁': '#b7b7b7',
	'⚂': '#8a8a8a',
	'⚃': '#8a8a8a',
	'⚄': '#636363',
	'⚅': '#636363'
};

function formatDate(input: string) {
	const date = new Date(input);

	// Get the year, month, and day from the date object
	const year = date.getFullYear();
	let month: any = date.getMonth() + 1; // getMonth() returns 0-11
	let day: any = date.getDate();

	// Pad the month and day with leading zeros if necessary
	month = month.toString().padStart(2, '0');
	day = day.toString().padStart(2, '0');

	// Combine components into the desired format
	return `${year}-${month}-${day}`;
}

const GridCard: React.FC<GridCardProps> = ({ title, username, icon, data }: GridCardProps) => {
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
	console.log(fixedLinkedData);

	if (actionLinkedData.length < 36) {
		return (
			<Card title={title} icon={icon} size={CardSize.Full}>
				<p>Cannot display grid for {actionLinkedData.length} data points.</p>
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

		gridItems.push(`${formatDate((rowData[0].created_at as string).split('@')[0].trim())}`);
		gridItems.push(...rowData);
	}

	useEffect(() => {
		const scale = (ref.current?.clientWidth || 1) / (gridRef.current?.clientWidth || 1);
		const theoreticalHeight = gridSize * 24;
		setHeight(theoreticalHeight * scale);
		setScale(scale);
	}, [fixedLinkedData.length]);

	const controlProperties = { '--v-height': `${height}px` } as React.CSSProperties;

	const combinedLegend = {...(showAction ? actionLegend : contentLegend), ...pauseLegend}
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
		//console.log(id);
		const url = `https://twitter.com/${username}/status/${id}`;
		window.open(url, '_blank');
	};

	return (
		<Card title={title} icon={icon} size={CardSize.Full}>
			<p>View the BLOC data as a grid to easily analyze trends and patterns.</p>
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
			<div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '12px' }}>
				<span style={{ width: 'min(calc(90% - 150px), 600px)' }}>
					<Dropdown options={['Action', 'Content Syntactic']} isClearable={false} onChange={(v) => toggleShowAction(v as string)} defaultValue="Action" />
				</span>
				<span>
					Show Labels <Toggle state={showDates} onChange={() => toggleShowDates()} />
				</span>
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
												return (
													<div
														className={style.item}
														key={index}
														style={{ backgroundColor: `${symbolColors[item.content] ?? 'white'}` }}
														data-title={`${symbolToDefinition(item.content)}\n${item.text}\n${item.created_at}`}
														onClick={() => routeToTweet(item.id)}
													>
														{showDates && <em>{item.content}</em>}
													</div>
												);
											}
										})}
									</div>
								</TransformComponent>
								<div className={style.tools}>
									<Button onClick={() => zoomIn()} label="+" visual="outline" />
									<Button onClick={() => zoomOut()} label="-" visual="outline" />
									<Button onClick={() => resetTransform()} label="X" visual="outline" />
								</div>
							</div>
						);
					}}
				</TransformWrapper>
			</div>
		</Card>
	);
};

export default GridCard;
