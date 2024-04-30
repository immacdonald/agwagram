import { Fragment, ReactNode } from 'react';
import { GetDefinition } from '../BLOCComponents';
import HoverMark from '../HoverMark';
import Card, { CardSize } from './Card';
import style from './Card.module.scss';
import { Link } from '../../icons';

interface LinkedDataCardProps {
	title: string;
	data: any;
}

const LinkedDataCard: React.FC<LinkedDataCardProps> = ({ title, data }: LinkedDataCardProps) => {
	return (
		<Card title={title} Icon={Link} size={CardSize.Full} scrollable>
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
		</Card>
	);
};

export default LinkedDataCard;
