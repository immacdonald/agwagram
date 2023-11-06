import React, { ReactNode, useContext } from 'react';
import style from './Card.module.scss';
import classNames from 'classnames';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalysisContext } from '../contexts/AnalysisContext';

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
                <a href="/methodology">More Details</a>
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
                    <thead>
                        <tr>
                            <th>Start Behavior</th>
                            <th>End Behavior</th>
                            <th style={{"width": "70px"}}>Pause</th>
                            <th style={{"width": "70px"}}>Word</th>
                            <th style={{"width": "70px"}}>Activity</th>
                            <th style={{"width": "90px"}}>Start Date</th>
                            <th style={{"width": "90px"}}>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {report.change_events.map((change_event : any, i : number) => {
                        return (
                            <tr key={i}>
                                <td>{change_event.first_segment.action}</td>
                                <td>{change_event.second_segment.action}</td>
                                <td>{change_event.change_profile.pause}</td>
                                <td>{change_event.change_profile.word}</td>
                                <td>{change_event.change_profile.activity}</td>
                                <td>{change_event.first_segment.local_dates[0]}</td>
                                <td>{change_event.second_segment.local_dates[0]}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

interface ChangeProfileCardProps {
    title: string;
    icon: ReactNode;
    reports: any;
}

export const ChangeProfileCard : React.FC<ChangeProfileCardProps> = ({ title, icon, reports }: ChangeProfileCardProps) => {
    const changeRate = [
        {
            Name: 'Action',
            Rate: reports['action']['change_profile']['change_rate']
        },
        {
            Name: 'Syntactic',
            Rate: reports['content_syntactic']['change_profile']['change_rate']
        }
    ];
    
    const averageChange = [
        {
            Name: 'Action',
            Word: reports['action']['change_profile']['average_change']['word'],
            Pause: reports['action']['change_profile']['average_change']['pause'],
            Activity: reports['action']['change_profile']['average_change']['activity']
        },
        {
            Name: 'Syntactic',
            Word: reports['content_syntactic']['change_profile']['average_change']['word'],
            Pause: 0,
            Activity: reports['content_syntactic']['change_profile']['average_change']['activity']
        }
    ]

    return (
        <Card title={title} icon={icon} size={CardSize.Full}>
            <div style={{ display: "flex", width: "100%", height: "400px"}}>
                <div style={{ width: "100%", height: "90%" }}>
                    <h3>Change Profile</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={100}
                        height={100}
                        data={changeRate}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Rate" fill="#143aa2" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: "100%", height: "90%" }}>
                    <h3>Average Change</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={100}
                        height={100}
                        data={averageChange}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Word" fill="#143aa2" />
                        <Bar dataKey="Pause" fill="#2159c0" />
                        <Bar dataKey="Activity" fill="#6ea9fc" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>
        </Card>
    );
}

interface TopWordsCardProps {
    title: string;
    subtitle?: string
    icon: ReactNode;
    top: any;
}

export const TopWordsCard : React.FC<TopWordsCardProps> = ({ title, subtitle, icon, top }: TopWordsCardProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);

    return (
        <Card title={title} icon={icon} size={CardSize.Wide}>
            {subtitle ? (<p>{subtitle}</p>) : false}
            <div className={style.scrollable}>
                <table>
                    <thead>
                        <tr>
                            <th style={{"width": "50px"}}>Rank</th>
                            <th style={{"width": "100px"}}>Word</th>
                            <th style={{"width": "90px"}}>Frequency</th>
                            <th style={{"width": "70px"}}>Rate (%)</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {top.map((word : Record<string, string>) => {
                        return (
                            <tr>
                                <td>{word.rank}.</td>
                                <td>{word.term}
                                    {/*% for char in word.term
                                        <div class="hoverable-text">
                                            {{ char }}
                                            <span class="hoverable-tooltip">{{ char|get_description }}</span>
                                        </div>
                                    */}
                                </td>
                                <td>{word.term_freq}</td>
                                <td>{word.term_rate}</td>
                                <td style={{"textAlign": "left"}}>{symbolToDefinition(word.term)}
                                    {/*% for char in word.term %
                                    <div class="hoverable-text">
                                        {{ char|get_description }}
                                        <span class="hoverable-tooltip">{{ char }}</span>
                                    </div>
                                    {% if not forloop.last %},&nbsp;{% endif %}
                                */}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

interface TopWordsCatergoryCardProps {
    title: string;
    subtitle?: string
    icon: ReactNode;
    top: any;
    symbolLabel: string;
}

export const TopWordsCatergoryCard : React.FC<TopWordsCatergoryCardProps> = ({ title, subtitle, icon, top, symbolLabel }: TopWordsCatergoryCardProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);

    return (
        <Card title={title} icon={icon} size={CardSize.Wide}>
            {subtitle ? (<p>{subtitle}</p>) : false}
            <div className={style.scrollable}>
            <table>
                <thead>
                    <tr>
                        <th style={{"width": "60px"}}>{symbolLabel}</th>
                        <th style={{"width": "90px"}}>Frequency</th>
                        <th style={{"width": "70px"}}>Rate (%)</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {top.map((word : any, i : number) => {
                    return (
                        <tr key={i}>
                            <td>{word.term}
                                {/*% for char in word.term %}
                                    <div class="hoverable-text">
                                        {{ char }}
                                        <span class="hoverable-tooltip">{{ char|get_description }}</span>
                                    </div>
                                {% endfor %*/}
                            </td>
                            <td>{word.term_freq}</td>
                            <td>{word.term_rate}</td>
                            <td style={{"textAlign": "left"}}>{symbolToDefinition(word.term)}
                                {/*% for char in word.term %}
                                    <div class="hoverable-text">
                                        {{ char|get_description }}
                                        <span class="hoverable-tooltip">{{ char }}</span>
                                    </div>
                                    {% if not forloop.last %},&nbsp;{% endif %}
                            {% endfor %*/}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
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