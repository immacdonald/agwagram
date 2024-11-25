import { Fragment } from 'react';
import { GetDefinition } from '@features';
import { Card, HoverMark, LinkIcon } from 'phantom-library';

interface LinkedDataCardProps {
    title: string;
    data: LinkedData[];
}

const LinkedDataCard: React.FC<LinkedDataCardProps> = ({ title, data }: LinkedDataCardProps) => {
    return (
        <Card fullHeight>
            <Card.Header title={title} Icon={LinkIcon} />
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
                            <HoverMark text={<em>{GetDefinition(datum['action'])}</em>} data-tooltip={titleString} />
                            {index !== data.length - 1 && ', '}
                        </Fragment>
                    );
                })}
            </Card.Body>
        </Card>
    );
};

export { LinkedDataCard };
