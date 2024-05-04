import { Dataset } from '../../icons';
import { DefinitionTooltip } from '../BLOCComponents';
import { GridCard, GridCardSize } from '../GridCard';

interface LanguageCardProps {
	title: string;
	bloc: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ title, bloc }: LanguageCardProps) => {
	const chars = bloc.split('');
	return (
		<GridCard title={title} Icon={Dataset} size={GridCardSize.Normal} scrollable>
			{chars.length > 0 ? chars.map((char, i) => <DefinitionTooltip key={i} word={char} />) : <p>No analysis available.</p>}
		</GridCard>
	);
};

export default LanguageCard;
