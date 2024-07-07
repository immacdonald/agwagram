import { ReactNode, useMemo, useState } from 'react';
import { Card, formatReadableDate, Row, Switch, Timeline, UnstyledButton } from 'phantom-library';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DefinitionTooltip } from '@components';
import tokens from '@styles/tokens.module.scss';

interface ChangeCardProps {
    title: string;
    report: Action;
}

const ChangeCard: React.FC<ChangeCardProps> = ({ title, report }: ChangeCardProps) => {
    if (report.change_profile) {
        // Only show pause change if it has a value
        const showPause: boolean = Number(report.change_profile.average_change.pause) >= 0;
        const [sortedField, setSortedField] = useState<string | null>('time');

        const tableContent = useMemo(() => {
            const sorted = [...report.change_events];
            if (sortedField == 'sim') {
                sorted.sort((a, b) => a.sim - b.sim);
                //sorted.reverse();
            } else if (sortedField == 'word') {
                sorted.sort((a, b) => Number(a.change_profile.word) - Number(b.change_profile.word));
            } else if (sortedField == 'pause') {
                sorted.sort((a, b) => Number(a.change_profile.pause) - Number(b.change_profile.pause));
            } else if (sortedField == 'activity') {
                sorted.sort((a, b) => Number(a.change_profile.activity) - Number(b.change_profile.activity));
            } else if (sortedField == 'start') {
                sorted.sort((a, b) => {
                    if (a.first_segment.local_dates![0] < b.first_segment.local_dates![0]) {
                        return -1;
                    }
                    if (a.first_segment.local_dates![0] > b.first_segment.local_dates![0]) {
                        return 1;
                    }
                    return 0;
                });
            } else if (sortedField == 'end') {
                sorted.sort((a, b) => {
                    if (a.second_segment.local_dates![0] < b.second_segment.local_dates![0]) {
                        return -1;
                    }
                    if (a.second_segment.local_dates![0] > b.second_segment.local_dates![0]) {
                        return 1;
                    }
                    return 0;
                });
            }

            return sorted.map((change_event: ChangeEvent, i: number) => {
                return (
                    <tr key={i}>
                        <td>
                            <DefinitionTooltip word={change_event.first_segment.action} />
                        </td>
                        <td>
                            <DefinitionTooltip word={change_event.second_segment.action} />
                        </td>
                        <td>{+change_event.sim.toFixed(2)}</td>
                        <td>{change_event.change_profile.word}</td>
                        {showPause ? <td>{change_event.change_profile.pause}</td> : false}
                        <td>{change_event.change_profile.activity}</td>
                        <td>{formatReadableDate(change_event.first_segment.local_dates![0])}</td>
                        <td>{formatReadableDate(change_event.second_segment.local_dates![0])}</td>
                    </tr>
                );
            });
        }, [sortedField]);

        const [changeGraph, setChangeGraph] = useState<{ [Key: string]: boolean }>({
            similarity: true,
            word: true,
            pause: true,
            activity: true
        });

        const toggleChangeGraphDisplay = (key: string): void => {
            setChangeGraph({ ...changeGraph, [key]: !changeGraph[key] });
        };

        const changeChronology: ChangeChronology[] = [];
        report.change_events.forEach((event: ChangeEvent) => {
            changeChronology.push({
                Date: event.first_segment.local_dates![0],
                Similarity: +event.sim.toFixed(2),
                Word: event.change_profile.word,
                Pause: event.change_profile.pause,
                Activity: event.change_profile.activity
            });
        });

        const sortButton = (text: string, code: string): ReactNode => {
            return (
                <UnstyledButton onClick={() => setSortedField(code)}>
                    {text}
                    {sortedField == code ? ' >' : false}
                </UnstyledButton>
            );
        };

        return (
            <Card>
                <Card.Header title={title} Icon={Timeline} />
                <Card.Body scrollable>
                    <p>
                        <strong>Change Rate</strong>: {report.change_profile.change_rate}
                        <br />
                        <strong>Average Change: </strong>
                        {`Word: ${report.change_profile.average_change.word}, `}
                        {showPause ? `Pause: ${report.change_profile.average_change.pause}, ` : false}
                        {`Activity: ${report.change_profile.average_change.activity}`}
                    </p>
                    <hr />
                    <div style={{ width: '100%', height: '480px' }}>
                        <h3>Change Profile</h3>
                        <Row>
                            <span>
                                Similarity <Switch state={changeGraph['similarity']} onChange={() => toggleChangeGraphDisplay('similarity')} />
                            </span>
                            <span>
                                Word <Switch state={changeGraph['word']} onChange={() => toggleChangeGraphDisplay('word')} />
                            </span>
                            <span>
                                Pause <Switch state={changeGraph['pause']} onChange={() => toggleChangeGraphDisplay('pause')} />
                            </span>
                            <span>
                                Activity <Switch state={changeGraph['activity']} onChange={() => toggleChangeGraphDisplay('activity')} />
                            </span>
                        </Row>
                        <ResponsiveContainer width="100%" height="85%">
                            <LineChart
                                width={500}
                                height={300}
                                data={changeChronology}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Date" tickFormatter={(value: string) => formatReadableDate(value)} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {changeGraph['similarity'] && <Line type="monotone" dataKey="Similarity" stroke={tokens['graph-green']} dot={false} />}
                                {changeGraph['word'] && <Line type="monotone" dataKey="Word" stroke={tokens['graph-blue']} dot={false} />}
                                {showPause && changeGraph['pause'] && <Line type="monotone" dataKey="Pause" stroke={tokens['graph-red']} dot={false} />}
                                {changeGraph['activity'] && <Line type="monotone" dataKey="Activity" stroke={tokens['graph-yellow']} dot={false} />}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <br />
                    <hr />
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '180px' }}>Start Behavior</th>
                                <th style={{ width: '180px' }}>End Behavior</th>
                                <th>{sortButton('Similarity', 'sim')}</th>
                                <th style={{ width: '70px' }}>{sortButton('Word', 'word')}</th>
                                {showPause ? <th style={{ width: '70px' }}>{sortButton('Pause', 'pause')}</th> : false}
                                <th style={{ width: '90px' }}>{sortButton('Activity', 'activity')}</th>
                                <th style={{ width: '170px' }}>{sortButton('Start Date', 'start')}</th>
                                <th style={{ width: '170px' }}>{sortButton('End Date', 'end')}</th>
                            </tr>
                        </thead>
                        <tbody>{tableContent}</tbody>
                    </table>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card>
                <Card.Header title={title} Icon={Timeline} />
                <Card.Body>
                    <p>No change report found.</p>
                </Card.Body>
            </Card>
        );
    }
};

export { ChangeCard };
