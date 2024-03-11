import { ReactNode } from 'react';
import { DefinitionTooltip, SymbolTooltip } from '../BLOCComponents';
import Card, { CardSize } from './Card';
import style from './Card.module.scss';

interface TopWordsCardProps {
	title: string;
	subtitle?: string;
	icon: ReactNode;
	top: any;
}

const TopWordsCard: React.FC<TopWordsCardProps> = ({ title, subtitle, icon, top }: TopWordsCardProps) => {
	return (
		<Card title={title} icon={icon} size={CardSize.Wide}>
			{subtitle ? <p>{subtitle}</p> : false}
			<div className={style.scrollable}>
				<table>
					<thead>
						<tr>
							<th style={{ width: '50px' }}>Rank</th>
							<th style={{ width: '100px' }}>Word</th>
							<th style={{ width: '90px' }}>Frequency</th>
							<th style={{ width: '70px' }}>Rate (%)</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{top.map((word: Record<string, string>, index: number) => {
							return (
								<tr key={index}>
									<td>{word.rank}.</td>
									<td>
										<DefinitionTooltip word={word.term} />
									</td>
									<td>{word.term_freq}</td>
									<td>{word.term_rate}</td>
									<td style={{ textAlign: 'left' }}>
										<SymbolTooltip word={word.term} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</Card>
	);
};

export default TopWordsCard;
