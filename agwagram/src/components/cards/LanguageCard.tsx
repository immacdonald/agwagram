import { DefinitionTooltip } from '../BLOCComponents';
import Card, { CardSize } from './Card';
import style from './Card.module.scss';
import { Dataset } from '../../icons';

interface LanguageCardProps {
	title: string;
	bloc: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ title, bloc }: LanguageCardProps) => {
	const chars = bloc.split('');
	return (
		<Card title={title} Icon={Dataset} size={CardSize.Normal} scrollable>
			{chars.length > 0 ? chars.map((char, i) => <DefinitionTooltip key={i} word={char} />) : <p>No analysis available.</p>}
		</Card>
	);
};

export default LanguageCard;
