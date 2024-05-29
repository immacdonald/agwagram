import { Card, BarChart } from '@imacdonald/phantom';
import { DefinitionTooltip, SymbolTooltip } from '../BLOCComponents';

interface TopWordsCardProps {
	title: string;
	subtitle?: string;
	top: Top[];
}

const TopWordsCard: React.FC<TopWordsCardProps> = ({ title, subtitle, top }: TopWordsCardProps) => {
	return (
		<Card fullHeight>
			<Card.Header title={title} subtitle={subtitle} Icon={BarChart} />
			<Card.Body scrollable>
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
						{top.map((word: Top, index: number) => {
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
			</Card.Body>
		</Card>
	);
};

export default TopWordsCard;
