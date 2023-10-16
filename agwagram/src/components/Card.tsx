import React, { ReactNode } from 'react';
import style from './Card.module.scss';
import classNames from 'classnames';

interface CardProps {
    title: string;
    size?: CardSize;
    icon: ReactNode;
    children: ReactNode
}

export enum CardSize {
    Normal,
    Wide,
    Full,
}

const Card: React.FC<CardProps> = ({ title, size = CardSize.Normal, icon, children }: CardProps) => {
    const cardClass = classNames(
        style.card,
        {
            [style.wide]: size == CardSize.Wide,
            [style.full]: size == CardSize.Full,
        },
    );

    return (
        <article className={cardClass}>
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

interface LanguageCardProps {
    title: string;
    icon: ReactNode;
    bloc: string;
}

export const LanguageCard : React.FC<LanguageCardProps> = ({ title, icon, bloc }: LanguageCardProps) => {
    const chars = bloc.split('');
    return (
        <Card title={title} icon={icon} size={CardSize.Normal}>
            {chars.map((char, index) => (
                <span key={index}>{char}</span>
            ))}
        </Card>
    );
}

/*<div className={style.hoverableText}>{{ char }}
                                            {% if char|get_description != '' %}
                                                <span className={style.hoverable-tooltip">{{ char|get_description }}</span>
                                            {% endif %}
                                        </div>
                                        {% endfor %}*/