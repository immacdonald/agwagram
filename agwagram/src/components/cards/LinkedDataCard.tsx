import { Fragment } from 'react';
import { Link } from '../../icons';
import { GetDefinition } from '../BLOCComponents';
import { GridCard, GridCardSize } from '../GridCard';
import HoverMark from '../HoverMark';

interface LinkedDataCardProps {
	title: string;
	data: any;
}

const LinkedDataCard: React.FC<LinkedDataCardProps> = ({ title, data }: LinkedDataCardProps) => {
	return (
		<GridCard title={title} Icon={Link} size={GridCardSize.Full} scrollable>
			{data.map((datum: any, index: number) => {
				let titleString = `Tweeted: ${datum.created_at}`;
				if (datum.content_syntactic != '') {
					titleString += `\nContent: ${GetDefinition(datum.content_syntactic)}`;
				}
				if (datum.content_semantic_entity != '') {
					titleString += `\nSubject: ${GetDefinition(datum.content_semantic_entity)}`;
				}

				return (
					<Fragment key={index}>
						<HoverMark data-title={titleString} text={GetDefinition(datum['action'])} />
						{index !== data.length - 1 && ', '}
					</Fragment>
				);
			})}
		</GridCard>
	);
};

export default LinkedDataCard;
