import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDate, graphColor } from '../../Global';
import { Chart } from '../../icons';
import { GridCard, GridCardSize } from '../GridCard';

interface GroupChangeCardProps {
	title: string;
	reports: AccountBloc[];
}

const GroupChangeCard: React.FC<GroupChangeCardProps> = ({ title, reports }) => {
	console.log(reports);
	const changeChronology: any[] = [];
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
		<GridCard title={title} Icon={Chart} size={GridCardSize.Full}>
			<div style={{ width: '100%', height: '400px' }}>
				<h3>Similarity Over Time</h3>
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
						<XAxis dataKey="Date" tickFormatter={formatDate} />
						<YAxis />
						<Tooltip />
						<Legend />
						{reports.map((report: any, i: number) => {
							return <Line type="monotone" dataKey={report.account_username} stroke={graphColor(i)} dot={false} key={i} />;
						})}
					</LineChart>
				</ResponsiveContainer>
			</div>
			<br />
		</GridCard>
	) : (
		<GridCard title={title} Icon={Chart} size={GridCardSize.Full}>
			<p>No change report generated.</p>
		</GridCard>
	);
};

export default GroupChangeCard;
