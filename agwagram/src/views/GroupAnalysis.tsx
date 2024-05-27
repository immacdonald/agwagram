import { Card, Grid, GridItemSize, GroupFilled, formatNumber } from '@imacdonald/phantom';
import { GroupChangeCard, TopWordsCard, TopWordsCategoryCard } from '../components/cards';
import { Hub } from '../icons';

interface GroupAnalysisProps {
	accounts: AccountBloc[];
	totalTweets: number;
	topBlocWords: Top[];
	topTimes: Top[];
	pairwiseSim: PairwiseSimilarity[];
}

const GroupAnalysis: React.FC<GroupAnalysisProps> = ({ accounts, totalTweets, topBlocWords, topTimes, pairwiseSim }) => {
	return (
		<Grid>
			<Grid.Item size={GridItemSize.Full}>
				<Card>
					<Card.Header title="Accounts Overview" Icon={GroupFilled} />
					<Card.Body>
						<h2>Analysis of {accounts.map((account: AccountBloc) => `@${account.account_username}`).join(', ')}</h2>
						<p>
							Results for{' '}
							{accounts.map((account: AccountBloc, index: number) => (
								<span key={index}>
									<b>@{account.account_username}</b> ({account.account_name}),{' '}
								</span>
							))}
							generated using {formatNumber(totalTweets)} tweets.
						</p>
					</Card.Body>
				</Card>
			</Grid.Item>
			<Grid.Item size={GridItemSize.Wide}>
				<TopWordsCard title="Top 100 Behaviors" subtitle="Displays the top 100 (or less) BLOC words between all the accounts analyzed." top={topBlocWords} />
			</Grid.Item>
			<Grid.Item size={GridItemSize.Wide}>
				<TopWordsCategoryCard title="Top Pauses" subtitle="Most frequent durations of pause between activities of each account." top={topTimes} symbolLabel="Pause" />
			</Grid.Item>
			<Grid.Item size={GridItemSize.Wide}>
				<Card>
					<Card.Header title="Pairwise Similarity" Icon={Hub} />
					<Card.Body>
						<table>
							<thead>
								<tr>
									<th>Similarity</th>
									<th>Account 1</th>
									<th>Account 2</th>
								</tr>
							</thead>
							<tbody>
								{pairwiseSim.map((u_pair: PairwiseSimilarity, index: number) => {
									return (
										<tr key={index}>
											<td>{`${+(u_pair.sim * 100).toFixed(1)}%`}</td>
											<td>{u_pair.user_pair[0]}</td>
											<td>{u_pair.user_pair[1]}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</Card.Body>
				</Card>
			</Grid.Item>
			<Grid.Item size={GridItemSize.Full}>
				<GroupChangeCard title="Comparative Change Between Accounts" reports={accounts} />
			</Grid.Item>
		</Grid>
	);
};

export { GroupAnalysis };
