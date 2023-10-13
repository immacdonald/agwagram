import React, { ReactNode } from 'react';
import style from './Card.module.scss';

interface CardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode
}

const Card: React.FC<CardProps> = ({ title, icon, children }: CardProps) => {
    return (
        <article className={style.card}>
            <div className={style.cardHeader}>
                <div>
                    <span className={style.icon}>{icon}</span>
                    <h3>{title}</h3>
                </div>
            </div>
            <div className={style.cardBody}>
                {children}
            </div>
            <div className={style.cardFooter}>
                <a href="methodology">More Details</a>
            </div>
        </article>
    );
}

export default Card;