import { ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { graphColor } from '../../Global';
import Card, { CardSize } from './Card';

interface ChangeProfileCardProps {
    title: string;
    icon: ReactNode;
    reports: any;
}

const ChangeProfileCard: React.FC<ChangeProfileCardProps> = ({ title, icon, reports }: ChangeProfileCardProps) => {
    if (reports.action.change_profile || reports.content_syntactic.change_profile) {
        const changeRate = [
            {
                Name: 'Change Rate',
                Content: reports['action']['change_profile']['change_rate'],
                Syntactic: reports['content_syntactic']['change_profile']['change_rate']
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
        ];

        return (
            <Card title={title} icon={icon} size={CardSize.Full}>
                <div style={{ display: 'flex', width: '100%', height: '400px' }}>
                    <div style={{ width: '100%', height: '90%' }}>
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
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Content" fill={graphColor(0)} />
                                <Bar dataKey="Syntactic" fill={graphColor(1)} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: '100%', height: '90%' }}>
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
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Word" fill={graphColor(0)} />
                                <Bar dataKey="Pause" fill={graphColor(1)} />
                                <Bar dataKey="Activity" fill={graphColor(2)} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Card>
        );
    } else {
        return <Card title={title} icon={icon} size={CardSize.Full}>
            <div style={{ display: 'flex', width: '100%', height: '400px' }}>
                <div style={{ width: '100%', height: '90%' }}>
                    <h3>Change Profile</h3>
                    <p>No change profile found.</p>
                </div>
            </div>
        </Card>
    }
};

                    export default ChangeProfileCard;
