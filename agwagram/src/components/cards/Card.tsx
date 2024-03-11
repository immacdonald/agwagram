import classNames from 'classnames';
import React, { ReactNode } from 'react';
import style from './Card.module.scss';

interface CardProps {
	title: string;
	size?: CardSize;
	icon: ReactNode;
	children?: ReactNode;
}

export enum CardSize {
	Normal,
	Wide,
	Full
}

const Card: React.FC<CardProps> = ({ title, size = CardSize.Normal, icon, children }: CardProps) => {
	const cardClass = classNames(style.card, {
		[style.wide]: size == CardSize.Wide,
		[style.full]: size == CardSize.Full
	});

	return (
		<article className={cardClass}>
			<div className={style.cardHeader}>
				<span className={style.icon}>{icon}</span>
				<h3>{title}</h3>
			</div>
			<div className={style.cardBody}>{children}</div>
			<div className={style.cardFooter}>{/*<a href="/methodology">More Details</a>*/}</div>
		</article>
	);
};

export default Card;
