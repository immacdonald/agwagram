import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../Global';
import Toggle from '../components/Input/Toggle';
import Loading from '../components/Loading';
import { Card, CardSize, ChangeCard, ChangeProfileCard, GridCard, GroupChangeCard, LanguageCard, LinkedDataCard, TopWordsCard, TopWordsCategoryCard } from '../components/cards';
import { clearResults, selectResults } from '../data/settingsSlice';
import { BarChart, Chart, Dataset, Group, Hub, Link as LinkIcon, Pause, Person, Timeline } from '../icons';
import style from './Results.module.scss';

const Results: React.FC = () => {
	const [expertMode, setExpertMode] = useState<boolean>(false);
	const [analysisView, setAnalysisView] = useState<number>(-1);

	const dispatch = useDispatch();

	const handleExpertToggle = () => setExpertMode(!expertMode);

	const resultState = useSelector(selectResults);

	const [hasPreviousResults, setHasPreviousResults] = useState<boolean>(false);
	const results = useMemo(() => {
		if (hasPreviousResults && resultState.data) {
			// Not the first load
			console.log('Hey');
			document.getElementById('results')?.scrollIntoView();
		} else if (hasPreviousResults) {
			console.log('Results but no data?');
		}
		setHasPreviousResults(true);
		return resultState.data;
	}, [resultState]);

	const returnToAnalysis = () => {
		dispatch(clearResults());
		document.getElementById('analyze')?.scrollIntoView();
	};

	const expertToggle = false && (
		<>
			Expert Mode: <Toggle state={expertMode} onChange={handleExpertToggle} />
		</>
	);

	const getAccountAnalysis = (account: AccountBloc) => {
		return (
			<>
				<Card title="Account Overview" icon={<Person />} size={CardSize.Full}>
					<h2 id="results">Analysis of @{account.account_username}</h2>
					<p>
						Results generated using {account.tweet_count} tweets from {formatDate(account.first_tweet_date)} to {formatDate(account.last_tweet_date)}.
					</p>
					{account.elapsed_time > 0 && <p>Analysis process took {account.elapsed_time} seconds to complete.</p>}
				</Card>
				<TopWordsCard title="Top 100 Behaviors" subtitle="Displays the top 100 (or less) BLOC words." icon={<BarChart />} top={account.top_bloc_words} />
				<TopWordsCategoryCard title="Top Pauses" subtitle="Most frequent durations of pause between account activities." icon={<Pause />} top={account.top_time} symbolLabel="Pause" />
				<GridCard title="Grid View" icon={<Dataset />} data={account.linked_data} />
				<ChangeProfileCard title="Change Profile Details" icon={<Chart />} reports={account.change_report} />
				<ChangeCard title="Action Change Profile" icon={<Timeline />} report={account.change_report.action} />
				<ChangeCard title="Syntactic Change Profile" icon={<Timeline />} report={account.change_report.content_syntactic} />
				{expertMode ? (
					<>
						<LanguageCard title="Action" icon={<Dataset />} bloc={account.bloc_action} />
						<LanguageCard title="Syntactic" icon={<Dataset />} bloc={account.bloc_syntactic} />
						<LanguageCard title="Semantic Entity" icon={<Dataset />} bloc={account.bloc_semantic_entity} />
						<LanguageCard title="Semantic Sentiment" icon={<Dataset />} bloc={account.bloc_semantic_sentiment} />
						<LanguageCard title="Change" icon={<Dataset />} bloc={account.bloc_change} />
						<LinkedDataCard title="LinkedData" icon={<LinkIcon />} data={account.linked_data} />
					</>
				) : (
					false
				)}
			</>
		);
	};

	if (results && results.successful_generation) {
		const accounts = results.account_blocs;
		if (accounts.length === 1) {
			const account = accounts[0];
			return (
				<div className={style.content}>
					<div className={style.contentHeader}>
						<div>
							<h1>
								Analysis of <span className={style.specialText}>@{account.account_username}</span> (<i>{account.account_name}</i>)
							</h1>
							<Link to="/" onClick={returnToAnalysis} className={style.analyzeAnother}>
								&#8592; Analyze Another
							</Link>
							{account.tweet_count > 0 ? (
								<>
									<br />
									{expertToggle}
									<p>
										Results generated using {account.tweet_count} tweets from {account.first_tweet_date} - {account.last_tweet_date}.
										{account.elapsed_time > 0 ? 'BLOC process took {account.elapsed_time} seconds to complete.' : false}
									</p>
								</>
							) : (
								<p>No results generated due to finding 0 tweets. BLOC process took {account.elapsed_time} seconds to complete.</p>
							)}
						</div>
					</div>
					<div className={style.contentMain}>
						<div className={style.cardGrid}>{getAccountAnalysis(account)}</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className={style.content}>
					<div className={style.contentHeader}>
						<div>
							<h1>Group Analysis</h1>
							<Link to="/" onClick={returnToAnalysis} className={style.analyzeAnother}>
								&#8592; Analyze Another
							</Link>
							<br />
							{expertToggle}
							<p>
								Successfully generated results for{' '}
								{accounts.map((account: any) => {
									return (
										<span className={style.specialText} key={account.account_username}>
											@{account.account_username}{' '}
										</span>
									);
								})}
							</p>
						</div>
					</div>
					<div className={style.contentMain}>
						<div className={style.tabButtons}>
							<button className={style.tabButton} data-active={analysisView == -1 ? true : false} onClick={() => setAnalysisView(-1)}>
								Group Analysis
							</button>
							{accounts.map((account: any, i: number) => {
								return (
									<button className={style.tabButton} key={i} data-active={i == analysisView ? true : false} onClick={() => setAnalysisView(i)}>
										@{account.account_username}
									</button>
								);
							})}
						</div>
						<div className={style.cardGrid}>
							{analysisView > -1 ? (
								getAccountAnalysis(accounts[analysisView])
							) : (
								<>
									<Card title="Accounts Overview" icon={<Group />} size={CardSize.Full}>
										<h2>Analysis of {accounts.map((account: any) => `@${account.account_username}`).join(', ')}</h2>
										<p>Results generated using {results.total_tweets} tweets.</p>
									</Card>
									<TopWordsCard
										title="Top 100 Behaviors"
										subtitle="Displays the top 100 (or less) BLOC words between all the accounts analyzed."
										icon={<BarChart />}
										top={results.group_top_bloc_words}
									/>
									<TopWordsCategoryCard
										title="Top Pauses"
										subtitle="Most frequent durations of pause between activities of each account."
										icon={<Pause />}
										top={results.group_top_time}
										symbolLabel="Pause"
									/>
									<Card title="Pairwise Similarity" icon={<Hub />}>
										<table>
											<thead>
												<tr>
													<th>Similarity</th>
													<th>Account 1</th>
													<th>Account 2</th>
												</tr>
											</thead>
											<tbody>
												{results.pairwise_sim.map((u_pair: any, index: number) => {
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
									</Card>
									<GroupChangeCard title="Comparative Change Between Accounts" icon={<Chart />} reports={results.account_blocs} />
								</>
							)}
						</div>
					</div>
				</div>
			);
		}
	} else {
		if (results) {
			return (
				<div className={style.contentHeader}>
					<div>
						<h1>Analysis Failed</h1>
						<Link to="/" onClick={returnToAnalysis} className={style.analyzeAnother}>
							&#8592; Analyze Another
						</Link>
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
					</div>
				</div>
			);
		} else if (resultState.loading) {
			return <Loading />;
		}
	}
};

export default Results;
