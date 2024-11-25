import { Card, ChartIcon, Heading, Typography } from 'phantom-library';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import tokens from '@styles/tokens.module.scss';

interface ChangeProfileCardProps {
    title: string;
    reports: ChangeReport;
}

const ChangeProfileCard: React.FC<ChangeProfileCardProps> = ({ title, reports }: ChangeProfileCardProps) => {
    if (reports.action?.change_profile || reports.content_syntactic?.change_profile) {
        const changeRate = [
            {
                Name: 'Change Rate',
                Content: reports.action!.change_profile.change_rate,
                Syntactic: reports.content_syntactic!.change_profile.change_rate
            }
        ];

        const averageChange = [
            {
                Name: 'Action',
                Word: reports.action!.change_profile.average_change.word,
                Pause: reports.action!.change_profile.average_change.pause,
                Activity: reports.action!.change_profile.average_change.activity
            },
            {
                Name: 'Syntactic',
                Word: reports.content_syntactic!.change_profile.average_change.word,
                Pause: 0,
                Activity: reports.content_syntactic!.change_profile.average_change.activity
            }
        ];

        return (
            <Card fullHeight>
                <Card.Header title={title} Icon={ChartIcon} />
                <Card.Body>
                    <div style={{ display: 'flex', width: '100%', height: '600px' }}>
                        <div style={{ width: '100%', height: '90%' }}>
                            <Heading>Change Profile</Heading>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={100}
                                    height={100}
                                    data={changeRate}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Content" fill={tokens['graph-blue']} />
                                    <Bar dataKey="Syntactic" fill={tokens['graph-red']} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ width: '100%', height: '90%' }}>
                            <Heading>Average Change</Heading>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={100}
                                    height={100}
                                    data={averageChange}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Word" fill={tokens['graph-blue']} />
                                    <Bar dataKey="Pause" fill={tokens['graph-red']} />
                                    <Bar dataKey="Activity" fill={tokens['graph-yellow']} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card>
                <Card.Header title={title} Icon={ChartIcon} />
                <Card.Body>
                    <div style={{ display: 'flex', width: '100%', height: '400px' }}>
                        <div style={{ width: '100%', height: '90%' }}>
                            <Heading minor>Change Profile</Heading>
                            <Typography.Paragraph>No change profile found.</Typography.Paragraph>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
};

export { ChangeProfileCard };
