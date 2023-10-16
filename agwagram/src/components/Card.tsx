import React, { ReactNode } from 'react';
import style from './Card.module.scss';
import classNames from 'classnames';

interface CardProps {
    title: string;
    size?: CardSize;
    icon: ReactNode;
    children?: ReactNode
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

interface ChangeCardProps {
    title: string;
    icon: ReactNode;
    report: any;
}

export const ChangeCard : React.FC<ChangeCardProps> = ({ title, icon, report }: ChangeCardProps) => {
    return (
        <Card title={title} icon={icon} size={CardSize.Full}>
            <p>
                <strong>Change Rates</strong>: {report.change_profile.change_rate}
                <br />
                <strong>Average Change: </strong>
                Word: {report.change_profile.average_change.word },
                Pause: {report.change_profile.average_change.pause },
                Activity: {report.change_profile.average_change.activity}
            </p>
            <hr />
            <div className={style.scrollable}>
                <table>
                    <tr>
                        <th>Behaviour</th>
                        <th style={{"width": "70px"}}>Pause</th>
                        <th style={{"width": "70px"}}>Word</th>
                        <th style={{"width": "70px"}}>Activity</th>
                        <th style={{"width": "90px"}}>Start Date</th>
                        <th style={{"width": "90px"}}>End Date</th>
                    </tr>
                    {report.change_events.map((change_event : any) => {
                        return (
                            <tr>
                                <td>{change_event.first_segment.action} to {change_event.second_segment.action}</td>
                                <td>{change_event.change_profile.pause}</td>
                                <td>{change_event.change_profile.word}</td>
                                <td>{change_event.change_profile.activity}</td>
                                <td>{change_event.first_segment.local_dates[0]}</td>
                                <td>{change_event.second_segment.local_dates[0]}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </Card>
    );
}

/*<div className={style.hoverableText}>{{ char }}
                                            {% if char|get_description != '' %}
                                                <span className={style.hoverable-tooltip">{{ char|get_description }}</span>
                                            {% endif %}
                                        </div>
                                        {% endfor %}*/