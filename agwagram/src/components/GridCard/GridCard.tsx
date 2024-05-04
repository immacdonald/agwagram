import { Card, IconProps } from '@imacdonald/phantom';
import classNames from 'classnames';
import React, { ComponentType, ReactNode } from 'react';
import style from './GridCard.module.scss';

interface GridCardProps {
	title: string;
	size?: GridCardSize;
	Icon: ComponentType<IconProps>;
	scrollable?: boolean;
	children?: ReactNode;
}

export enum GridCardSize {
	Normal,
	Wide,
	Full
}

const GridCard: React.FC<GridCardProps> = ({ title, size = GridCardSize.Normal, Icon, scrollable = false, children }) => {
	const cardClass = classNames(style.card, {
		[style.wide]: size == GridCardSize.Wide,
		[style.full]: size == GridCardSize.Full
	});

	return (
		<Card className={cardClass}>
			<Card.Header Icon={Icon} title={title} />
			<Card.Body scrollable={scrollable}>{children}</Card.Body>
		</Card>
	);
};

export { GridCard };
