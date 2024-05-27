import { Card } from '@imacdonald/phantom';
import { Fragment } from 'react';
import { Link } from '../../icons';
import { GetDefinition } from '../BLOCComponents';
import HoverMark from '../HoverMark';

interface LinkedDataCardProps {
	title: string;
	data: LinkedData[];
}

const LinkedDataCard: React.FC<LinkedDataCardProps> = ({ title, data }: LinkedDataCardProps) => {
	return (
		<Card fullHeight>
			<Card.Header title={title} Icon={Link} />
			<Card.Body scrollable>
				{data.map((datum: LinkedData, index: number) => {
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
			</Card.Body>
		</Card>
	);
};

export default LinkedDataCard;
