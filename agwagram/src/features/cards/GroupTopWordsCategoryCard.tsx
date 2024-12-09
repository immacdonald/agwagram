import { useMemo } from 'react';
import { BarChartIcon, Column, Row, Typography } from 'phantom-library';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { Card } from '@components';
import { tokens } from '@styles/tokens';

interface GroupTopWordsCategoryCardProps {
    title: string;
    subtitle?: string;
    accounts: AccountBloc[];
}

const timeSymbols = {
    '□': '< 1 Minute',
    '⚀': '< 1 Hour',
    '⚁': '< 1 Day',
    '⚂': '< 1 Week',
    '⚃': '< 1 Month',
    '⚄': '< 1 Year',
    '⚅': '> 1 Year'
};

const GroupTopWordsCategoryCard: React.FC<GroupTopWordsCategoryCardProps> = ({ title, subtitle, accounts }) => {
    const category = 'top_time';

    const data = useMemo(() => {
        return accounts.map((account) => {
            const pauses = account[category];
            return Object.entries(timeSymbols).map(([pause, meaning]) => {
                const word = pauses.filter((top) => top.term == pause);
                return {
                    term: meaning,
                    frequency: word.length > 0 ? parseInt(word[0].term_freq) : 0,
                    rate: word.length > 0 ? parseFloat(word[0].term_rate) : 0
                };
            });
        });
    }, [accounts]);

    return (
        <Card fullHeight>
            <Card.Header title={title} subtitle={subtitle} Icon={BarChartIcon} />
            <Card.Body>
                <Row>
                    {data.map((accountData, index) => {
                        return (
                            <Column style={{ width: `calc(${100 / accounts.length}% + ${index == 0 ? 80 - 30 : 0}px - 30px)` }}>
                                <Typography.Text>@{accounts[index].account_username}</Typography.Text>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart layout="vertical" data={accountData} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" allowDataOverflow={false} tickCount={4} />
                                        <YAxis type="category" dataKey="term" width={80} hide={index > 0} />
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
                            </Column>
                        );
                    })}
                </Row>
                {/*<table>
                    <thead>
                        <tr>
                            <th>{categoryTitle}</th>
                            {accounts.map((account: AccountBloc) => {
                                return <th key={account.account_username}>@{account.account_username}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(timeSymbols).map((key, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <SymbolTooltip word={key} />
                                    </td>
                                    {accounts.map((account: AccountBloc) => {
                                        const match = account[category].filter((top) => top.term == key);
                                        if (match.length == 0) {
                                            return <td key={account.account_username} />;
                                        }

                                        const word = match[0];

                                        return <td key={account.account_username}>{word.term_rate}%</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>*/}
            </Card.Body>
        </Card>
    );
};

export { GroupTopWordsCategoryCard };
