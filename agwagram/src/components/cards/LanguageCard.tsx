import { Card, Dataset } from 'phantom-library';
import { DefinitionTooltip } from '../BLOCComponents';

interface LanguageCardProps {
	title: string;
	bloc: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ title, bloc }: LanguageCardProps) => {
	const chars = bloc.split('');
	return (
		<Card fullHeight>
			<Card.Header title={title} Icon={Dataset} />
			<Card.Body scrollable>{chars.length > 0 ? chars.map((char, i) => <DefinitionTooltip key={i} word={char} />) : <p>No analysis available.</p>}</Card.Body>
		</Card>
	);
};

export default LanguageCard;
