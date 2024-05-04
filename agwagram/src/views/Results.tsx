import { Tab, TabGroup } from '@imacdonald/phantom';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { GridCard } from '../components/GridCard';
import { selectResults } from '../data/settingsSlice';
import { BarChart } from '../icons';
import { AccountAnalysis } from './AccountAnalysis';
import { GroupAnalysis } from './GroupAnalysis';
import style from './Results.module.scss';

const Results: React.FC = () => {
	const resultState = useSelector(selectResults);

	const results = useMemo(() => {
		return resultState.data;
	}, [resultState]);

	if (results && results.successful_generation) {
		const accounts = results.account_blocs;
		if (accounts.length === 1) {
			const account = accounts[0];
			return (
				<div className={style.content}>
					<div className={style.cardGrid}>
						<AccountAnalysis account={account} />
					</div>
				</div>
			);
		} else {
			return (
				<div className={style.content}>
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
						containerClass={style.cardGrid}
					/>
				</div>
			);
		}
	} else {
		if (results) {
			return (
				<GridCard title="Analysis Failed" Icon={BarChart}>
					<p>Unable to generate BLOC analysis results for the following accounts: {results.query.join(', ')}</p>
					{results.errors.map((error: Record<string, string>) => {
						return (
							<div key={error.account_username}>
								{error.account_username ? (
									<h3>
										Error: <span className={style.specialText}>{error.account_username}</span>
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
				</GridCard>
			);
		}
	}
};

export default Results;
