import classNames from 'classnames';
import React, { ComponentType, ReactNode } from 'react';
import { IconProps, Card as PhantomCard } from '@imacdonald/phantom';
import style from './Card.module.scss';

interface CardProps {
	title: string;
	size?: CardSize;
	Icon: ComponentType<IconProps>;
	scrollable?: boolean;
	children?: ReactNode;
}

export enum CardSize {
	Normal,
	Wide,
	Full
}

const Card: React.FC<CardProps> = ({ title, size = CardSize.Normal, Icon, scrollable = false, children }: CardProps) => {
	const cardClass = classNames(style.card, {
		[style.wide]: size == CardSize.Wide,
		[style.full]: size == CardSize.Full
	});

	return (
		<PhantomCard className={cardClass}>
			<PhantomCard.Header Icon={Icon} title={title}/>
			<PhantomCard.Body scrollable={scrollable}>
				{children}
			</PhantomCard.Body>
		</PhantomCard>
	);
};

export default Card;
