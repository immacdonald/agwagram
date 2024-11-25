import { FormEvent, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { DefinitionTooltip } from '@features';
import { Card, formatReadableDate, Row, Switch, TimelineIcon, UnstyledButton, Heading, Typography } from 'phantom-library';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import tokens from '@styles/tokens.module.scss';

interface ChangeCardProps {
    title: string;
    report: Action;
}

type ChangeGraphState = Record<string, boolean>;

const ChangeCard: React.FC<ChangeCardProps> = ({ title, report }: ChangeCardProps) => {
    if (report.change_profile) {
        const changeGraph = useRef<ChangeGraphState>({
            similarity: true,
            word: true,
            pause: true,
            activity: true
        });

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
        }, [sortedField, changeGraph.current]);

        const [, updateState] = useState<any>();
        const forceUpdate = useCallback(() => updateState({}), []);

        const toggleChangeGraphDisplay = (key: string, state: boolean): void => {
            changeGraph.current = { ...changeGraph.current, [key]: state };
            forceUpdate();
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
                    <>
                        {text}
                        {sortedField == code ? ' >' : false}
                    </>
                </UnstyledButton>
            );
        };

        const changeToggles = (
            <>
                <span>
                    Similarity{' '}
                    <Switch defaultChecked={changeGraph.current['similarity']} onChange={(event: FormEvent<HTMLInputElement>) => toggleChangeGraphDisplay('similarity', event.currentTarget.checked)} />
                </span>
                <span>
                    Word <Switch defaultChecked={changeGraph.current['word']} onChange={(event: FormEvent<HTMLInputElement>) => toggleChangeGraphDisplay('word', event.currentTarget.checked)} />
                </span>
                <span>
                    Pause <Switch defaultChecked={changeGraph.current['pause']} onChange={(event: FormEvent<HTMLInputElement>) => toggleChangeGraphDisplay('pause', event.currentTarget.checked)} />
                </span>
                <span>
                    Activity{' '}
                    <Switch defaultChecked={changeGraph.current['activity']} onChange={(event: FormEvent<HTMLInputElement>) => toggleChangeGraphDisplay('activity', event.currentTarget.checked)} />
                </span>
            </>
        );

        return (
            <Card>
                <Card.Header title={title} Icon={TimelineIcon} />
                <Card.Body scrollable>
                    <Typography.Paragraph>
                        <strong>Change Rate</strong>: {report.change_profile.change_rate}
                        <br />
                        <strong>Average Change: </strong>
                        {`Word: ${report.change_profile.average_change.word}, `}
                        {showPause ? `Pause: ${report.change_profile.average_change.pause}, ` : false}
                        {`Activity: ${report.change_profile.average_change.activity}`}
                    </Typography.Paragraph>
                    <div style={{ width: '100%', height: '480px' }}>
                        <Heading minor>Change Profile</Heading>
                        <Row>{changeToggles}</Row>
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
                                {changeGraph.current['similarity'] && <Line type="monotone" dataKey="Similarity" stroke={tokens['graph-green']} dot={false} />}
                                {changeGraph.current['word'] && <Line type="monotone" dataKey="Word" stroke={tokens['graph-blue']} dot={false} />}
                                {showPause && changeGraph.current['pause'] && <Line type="monotone" dataKey="Pause" stroke={tokens['graph-red']} dot={false} />}
                                {changeGraph.current['activity'] && <Line type="monotone" dataKey="Activity" stroke={tokens['graph-yellow']} dot={false} />}
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
                <Card.Header title={title} Icon={TimelineIcon} />
                <Card.Body>
                    <Typography.Paragraph>No change report found.</Typography.Paragraph>
                </Card.Body>
            </Card>
        );
    }
};

export { ChangeCard };
