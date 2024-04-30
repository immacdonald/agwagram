import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectResults } from '../data/settingsSlice';
import style from './Results.module.scss';
import { Button } from '@imacdonald/phantom';
import { AccountAnalysis } from './AccountAnalysis';
import { GroupAnalysis } from './GroupAnalysis';
import { Card } from '../components/cards';
import { BarChart } from '../icons';

const Results: React.FC = () => {
	const [analysisView, setAnalysisView] = useState<number>(-1);

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

					<div className={style.tabButtons}>
						<Button visual={analysisView == -1 ? 'filled' : 'ghost'} full onClick={() => setAnalysisView(-1)} label="Group Analysis" />
						{accounts.map((account: any, i: number) => {
							return (
								<Button key={i} visual={analysisView == i ? 'filled' : 'ghost'} full onClick={() => setAnalysisView(i)} label={`@${account.account_username}`} />
							);
						})}
					</div>
					<div className={style.cardGrid}>
						{analysisView > -1 ? (
							<AccountAnalysis account={accounts[analysisView]} />
						) : (
							<GroupAnalysis accounts={accounts} totalTweets={results.total_tweets} topBlocWords={results.group_top_bloc_words} topTimes={results.group_top_time} pairwiseSim={results.pairwise_sim} />
						)}
					</div>
				</div>
			);
		}
	} else {
		if (results) {
			return (
				<Card title="Analysis Failed" Icon={BarChart}>
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
				</Card>
			);
		}
	}
};

export default Results;
