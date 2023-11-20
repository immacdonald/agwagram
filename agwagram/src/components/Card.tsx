import React, { ReactNode, useMemo } from 'react';
import style from './Card.module.scss';
import classNames from 'classnames';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as GraphTooltip, Legend, ResponsiveContainer } from 'recharts';
import { SymbolTooltip, DefinitionTooltip } from './BLOCComponents';

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
                <DefinitionTooltip word={char}/>
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
    // Only show pause change if it has a value
    const showPause : boolean = report.change_profile.average_change.pause >= 0;
    const [sortedField, setSortedField] = React.useState<string | null>('time');

    const tableContent = useMemo(() => {
        let sorted = [...(report.change_events)];
        if (sortedField == 'sim') {
            sorted.sort((a, b) => a.sim - b.sim);
            sorted.reverse();
        } else if (sortedField == 'time') {
            sorted.sort((a, b) => {
            if (a.first_segment.local_dates[0] < b.first_segment.local_dates[0]) {
                return -1;
            }
            if (a.first_segment.local_dates[0] > b.first_segment.local_dates[0]) {
                return 1;
            }
            return 0;
            });
        }

        report.change_events = sorted;

        return (report.change_events.map((change_event : any, i : number) => {
            return (
                <tr key={i}>
                    <td><DefinitionTooltip word={change_event.first_segment.action}/></td>
                    <td><DefinitionTooltip word={change_event.second_segment.action}/></td>
                    <td>{+change_event.sim.toFixed(2)}</td>
                    <td>{change_event.change_profile.word}</td>
                    {showPause ? (<td>{change_event.change_profile.pause}</td>) : false}
                    <td>{change_event.change_profile.activity}</td>
                    <td>{change_event.first_segment.local_dates[0]}</td>
                    <td>{change_event.second_segment.local_dates[0]}</td>
                </tr>
            )
        }))
    }, [sortedField]);

    return (
        <Card title={title} icon={icon} size={CardSize.Full}>
            <p>
                <strong>Change Rate</strong>: {report.change_profile.change_rate}
                <br />
                <strong>Average Change: </strong>
                {`Word: ${report.change_profile.average_change.word}, `}
                {showPause ? (`Pause: ${report.change_profile.average_change.pause }, `) : false}
                {`Activity: ${report.change_profile.average_change.activity}`}
            </p>
            <hr />
            <div className={style.scrollable}>
                <table>
                    <thead>
                        <tr>
                            <th style={{"width": "180px"}}>Start Behavior</th>
                            <th style={{"width": "180px"}}>End Behavior</th>
                            <th><button type="button" onClick={() => setSortedField('sim')}>Similarity{sortedField == 'sim' ? ' >' : false}</button></th>
                            <th style={{"width": "70px"}}>Word</th>
                            {showPause ? (<th style={{"width": "70px"}}>Pause</th>) : false}
                            <th style={{"width": "70px"}}>Activity</th>
                            <th><button type="button" onClick={() => setSortedField('time')}>Start Date{sortedField == 'time' ? ' >' : false}</button></th>
                            <th style={{"width": "90px"}}>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
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
                        <GraphTooltip />
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
                        <GraphTooltip />
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
                    {top.map((word : Record<string, string>, index : number) => {
                        return (
                            <tr key={index}>
                                <td>{word.rank}.</td>
                                <td><DefinitionTooltip word={word.term}/></td>
                                <td>{word.term_freq}</td>
                                <td>{word.term_rate}</td>
                                <td style={{"textAlign": "left"}}><SymbolTooltip word={word.term}/></td>
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
                            <td><DefinitionTooltip word={word.term}/></td>
                            <td>{word.term_freq}</td>
                            <td>{word.term_rate}</td>
                            <td style={{"textAlign": "left"}}><SymbolTooltip word={word.term}/></td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        </Card>
    );
}

interface LinkedDataCardProps {
    title: string;
    icon: ReactNode;
    data: any
}

export const LinkedDataCard : React.FC<LinkedDataCardProps> = ({ title, icon, data }: LinkedDataCardProps) => {
    console.log(data);
    //const chars = data.split('');

    return (
        <Card title={title} icon={icon} size={CardSize.Normal}>
            {/*{chars.map((char : string, index : number) => (
                <DefinitionTooltip word={char}/>
            ))}*/}
        </Card>
    );

    /*
        {% for char in account.bloc_action %}
                    {% if char|get_type != 'Action' %}
                        {{ char|get_description }}
                    {% else %}
                        {% with count=account.counter.count %}
                        {% with data=account.linked_data|index:count %}
                            {% if not forloop.first %}&nbsp;{% endif %}
                            <div class="hoverable-text"><strong>{{ char|get_description }}</strong>
                                <span class="hoverable-tooltip large">
                                    Tweeted: {{ data.created_at }} <br>
                                    Content: {{ data.content_syntactic|get_description }} 
                                    {% if data.content_semantic_entity %}
                                        <br>
                                        Subject: {{ data.content_semantic_entity|get_description }} 
                                    {% endif %}
                                </span>
                            </div>
                            {{ account.counter.increment }}
                        {% endwith %}
                        {% endwith %}
                    {% endif %}
                    {% if not forloop.last %},&nbsp;{% endif %}
                {% endfor %}
    */
}

