import { DefinitionTooltip, SymbolTooltip } from '../BLOCComponents';
import Card, { CardSize } from './Card';
import style from './Card.module.scss';
import { BarChart } from '../../icons';

interface TopWordsCardProps {
	title: string;
	subtitle?: string;
	top: any;
}

const TopWordsCard: React.FC<TopWordsCardProps> = ({ title, subtitle, top }: TopWordsCardProps) => {
	return (
		<Card title={title} Icon={BarChart} size={CardSize.Wide} scrollable>
			{subtitle ? <span>{subtitle}</span> : false}
			<table>
				<thead>
					<tr>
						<th style={{ width: '55px' }}>Rank</th>
						<th style={{ width: '100px' }}>Word</th>
						<th style={{ width: '90px' }}>Frequency</th>
						<th style={{ width: '85px' }}>Rate (%)</th>
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
		</Card>
	);
};

export default TopWordsCard;
