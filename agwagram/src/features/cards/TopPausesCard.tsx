import { useMemo } from 'react';
import { PauseIcon } from 'phantom-library';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { Card } from '@components';
import { useGetSymbolsQuery } from '@data/apiSlice';
import { tokens } from '@styles/tokens';
import { symbolToDefinition } from '../tooltips/bloc';

interface TopPausesCardProps {
    title: string;
    pauses: Top[];
}

const TopPausesCard: React.FC<TopPausesCardProps> = ({ title, pauses }) => {
    const { data: symbols } = useGetSymbolsQuery();

    const data = useMemo(() => {
        return pauses.map((word) => {
            return {
                term: `${symbolToDefinition(symbols, word.term)}`,
                frequency: parseInt(word.term_freq),
                rate: parseFloat(word.term_rate)
            };
        });
    }, [pauses]);

    return (
        <Card fullHeight>
            <Card.Header title={title} subtitle="Most frequent pauses between actions." Icon={PauseIcon} />
            <Card.Body>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart layout="vertical" data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" allowDataOverflow={false} tickCount={4} />
                        <YAxis type="category" dataKey="term" width={80} />
                        <Tooltip
                            formatter={(value, name, props) => {
                                const { payload } = props;
                                if (name === 'frequency') {
                                    return [`Frequency: ${value}`, 'Rate: ' + payload.rate + '%'];
                                }
                                return value;
                            }}
                        />
                        <Bar dataKey="frequency" fill={tokens.graph.blue} />
                    </BarChart>
                </ResponsiveContainer>
                {/*<table>
                    <thead>
                        <tr>
                            <th>{category}</th>
                            <th style={{ width: '90px' }}>Frequency</th>
                            <th style={{ width: '85px' }}>Rate (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top.map((word: Top, i: number) => {
                            return (
                                <tr key={i}>
                                    <td style={{ textAlign: 'left' }}>
                                        <SymbolTooltip word={word.term} />
                                    </td>
                                    <td>{word.term_freq}</td>
                                    <td>{word.term_rate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>*/}
            </Card.Body>
        </Card>
    );
};

export { TopPausesCard };
