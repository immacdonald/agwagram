import { Card, Chart, formatReadableDate, Heading, Text } from 'phantom-library';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import tokens from '@styles/tokens.module.scss';

interface GroupChangeCardProps {
    title: string;
    reports: AccountBloc[];
}

const graphColorMap = [tokens['graph-blue'], tokens['graph-red'], tokens['graph-yellow'], tokens['graph-green']];

const GroupChangeCard: React.FC<GroupChangeCardProps> = ({ title, reports }) => {
    const changeChronology: ChangeChronology[] = [];
    reports.forEach((report: AccountBloc) => {
        if (report.change_report && report.change_report.action) {
            report.change_report.action.change_events.forEach((event: ChangeEvent) => {
                changeChronology.push({
                    Date: (event.first_segment.local_dates || [''])[0],
                    [report.account_username]: +event.sim.toFixed(2)
                });
            });
        }
    });

    return changeChronology.length > 0 ? (
        <Card fullHeight>
            <Card.Header title={title} Icon={Chart} />
            <Card.Body>
                <div style={{ width: '100%', height: '400px' }}>
                    <Heading title="Similarity Over Time" bold={false} />
                    <ResponsiveContainer width="100%" height="100%">
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
                            {reports.map((report: AccountBloc, index: number) => {
                                return <Line type="monotone" dataKey={report.account_username} stroke={graphColorMap[index % graphColorMap.length]} dot={false} key={index} />;
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <br />
            </Card.Body>
        </Card>
    ) : (
        <Card fullHeight>
            <Card.Header title={title} Icon={Chart} />
            <Card.Body>
                <Text>No change report generated.</Text>
            </Card.Body>
        </Card>
    );
};

export { GroupChangeCard };
