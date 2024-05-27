import { Card, Tab, TabGroup } from '@imacdonald/phantom';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectResults } from '../data/settingsSlice';
import { BarChart } from '../icons';
import { AccountAnalysis } from './AccountAnalysis';
import { GroupAnalysis } from './GroupAnalysis';

const Results: React.FC = () => {
	const resultState = useSelector(selectResults);

	const results = useMemo(() => {
		return resultState.data;
	}, [resultState]);

	if (results && results.successful_generation) {
		const accounts = results.account_blocs;
		if (accounts.length === 1) {
			const account = accounts[0];
			return <AccountAnalysis account={account} />;
		} else {
			return (
				<TabGroup
					tabs={[
						{
							label: 'Group Analysis',
							tab: (
								<GroupAnalysis
									accounts={accounts}
									totalTweets={results.total_tweets}
									topBlocWords={results.group_top_bloc_words}
									topTimes={results.group_top_time}
									pairwiseSim={results.pairwise_sim}
								/>
							)
						},
						...accounts.map((account: AccountBloc) => ({ label: `@${account.account_username}`, tab: <AccountAnalysis account={account} /> }) as Tab)
					]}
				/>
			);
		}
	} else {
		if (results) {
			return (
				<Card>
					<Card.Header title="Analysis Failed" Icon={BarChart} />
					<Card.Body>
						<p>Unable to generate BLOC analysis results for the following accounts: {results.query.join(', ')}</p>
						{results.errors.map((error: Record<string, string>) => {
							return (
								<div key={error.account_username}>
									{error.account_username ? (
										<h3>
											Error: <b>{error.account_username}</b>
										</h3>
									) : (
										<h3>Error</h3>
									)}
									<p>
										Unable to analyze account due to <i>{error.error_title}</i>.
									</p>
									<p>
										Details: <i>{error.error_detail}</i>
									</p>
								</div>
							);
						})}
					</Card.Body>
				</Card>
			);
		}
	}
};

export default Results;
