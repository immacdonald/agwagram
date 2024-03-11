import { ReactNode } from 'react';
import { DefinitionTooltip, SymbolTooltip } from '../BLOCComponents';
import Card, { CardSize } from './Card';
import style from './Card.module.scss';

interface TopWordsCategoryCardProps {
	title: string;
	subtitle?: string;
	icon: ReactNode;
	top: any;
	symbolLabel: string;
}

const TopWordsCategoryCard: React.FC<TopWordsCategoryCardProps> = ({ title, subtitle, icon, top, symbolLabel }: TopWordsCategoryCardProps) => {
	return (
		<Card title={title} icon={icon} size={CardSize.Wide}>
			{subtitle ? <p>{subtitle}</p> : false}
			<div className={style.scrollable}>
				<table>
					<thead>
						<tr>
							<th style={{ width: '60px' }}>{symbolLabel}</th>
							<th style={{ width: '90px' }}>Frequency</th>
							<th style={{ width: '70px' }}>Rate (%)</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{top.map((word: any, i: number) => {
							return (
								<tr key={i}>
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

export default TopWordsCategoryCard;
