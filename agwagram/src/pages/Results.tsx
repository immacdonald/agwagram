import React, { useState, useContext } from 'react';
import style from './Results.module.scss'
import { AnalysisContext } from '../contexts/AnalysisContext';
import BarChart from '../images/icons/bar_chart.svg?react';
import Card, { CardSize, ChangeCard, LanguageCard, TopWordsCard, TopWordsCatergoryCard } from '../components/Card';

const Results: React.FC = () => {
    const {
        results
    } = useContext(AnalysisContext);

    const result = results.result;

    const [expertMode, setExpertMode] = useState<boolean>(true);
    const [analysisView, setAnalysisView] = useState<number>(-1);

    const handleExpertToggle = () => {
        setExpertMode(!expertMode);
    }

    const getAccountAnalysis = (account: any) => {
        return (
            <>
                <TopWordsCard
                    title="Top 100 Behaviours"
                    subtitle="Displays the top 100 (or less) BLOC words."
                    icon={<BarChart/>}
                    top={account.top_bloc_words}
                />
                <TopWordsCatergoryCard
                    title="Top Pauses"
                    subtitle="Most frequent durations of pause between account activities."
                    icon={<BarChart/>} 
                    top={account.top_time}
                    symbolLabel="Pause"
                />
                <ChangeCard title="Action Change Profile" icon={<BarChart/>} report={account.change_report['action']}/>
                <ChangeCard title="Syntactic Change Profile" icon={<BarChart/>} report={account.change_report['content_syntactic']}/>
                {expertMode ? (
                    <>
                        <LanguageCard title = "Action" icon={<BarChart/>} bloc={account.bloc_action}/>
                        <LanguageCard title = "Syntactic" icon={<BarChart/>} bloc={account.bloc_syntactic}/>
                        <LanguageCard title = "Semantic Entity" icon={<BarChart/>} bloc={account.bloc_semantic_entity}/>
                        <LanguageCard title = "Semantic Sentiment" icon={<BarChart/>} bloc={account.bloc_semantic_sentiment}/>
                        <LanguageCard title = "Change" icon={<BarChart/>} bloc={account.bloc_change}/>
                    </>
                ) : false}
            </>
        );
    }

    if (results && result['successful_generation']) {
        const accounts = result['account_blocs'];
        if (accounts.length === 1) {
            const account = accounts[0];
            return (
                <div className={style.content}>
                    <div className={style.contentHeader}>
                        <div>
                            <h1>
                                Analysis of <span className={style.specialText}>
                                    @{account['account_username']}
                                </span> (<em>{account['account_name']}</em>)
                            </h1>
                            {account.tweet_count > 0 ? (
                                <p>
                                    Results generated using {account.tweet_count} tweets from {account.first_tweet_date} - {account.last_tweet_date}. 
                                    {account.elapsed_time > 0 ? ("BLOC process took {account.elapsed_time} seconds to complete.") : false}
                                </p>
                            ) : (
                                <p>
                                    No results generated due to finding 0 tweets. BLOC process took {account.elapsed_time} seconds to complete.
                                </p>
                            )
                            }
                            Expert Mode: <input type="checkbox" onChange={handleExpertToggle} checked={expertMode} />
                        </div>
                    </div>
                    <div className={style.contentMain}>
                        <div className={style.cardGrid}>
                            {getAccountAnalysis(account)}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={style.content}>
                    <div className={style.contentHeader}>
                        <div>
                            <h1>Group Analysis</h1> 
                            <p>Successfully generated results for {accounts.map((account : any) => {
                                return (<span className={style.specialText}>@{account.account_username} </span>)})}
                            </p>
                            Expert Mode: <input type="checkbox" onChange={handleExpertToggle} checked={expertMode} />
                        </div>
                    </div>
                    <div className={style.contentMain}>
                    <div className={style.tabButtons}>
                        <button className={style.tabButton} data-active={analysisView == -1 ? true : false} onClick={() => setAnalysisView(-1)}>Group Analysis</button>
                        {accounts.map((account : any, i : number) => {
                            return (
                                <button className={style.tabButton} data-active={i == analysisView ? true : false} onClick={() => setAnalysisView(i)}>@{account.account_username}</button>
                            )
                        })}
                    </div>
                        <div className={style.cardGrid}>
                            {analysisView > -1 ? getAccountAnalysis(accounts[analysisView]) : 
                                <>
                                    <TopWordsCard
                                        title="Top 100 Behaviours"
                                        subtitle="Displays the top 100 (or less) BLOC words between all the accounts analyzed."
                                        icon={<BarChart/>}
                                        top={result['group_top_bloc_words']}
                                    />
                                    <TopWordsCatergoryCard
                                        title="Top Pauses"
                                        subtitle="Most frequent durations of pause between activities of each account."
                                        icon={<BarChart/>}
                                        top={result['group_top_time']}
                                        symbolLabel="Pause"
                                    />
                                    <Card title="Pairwise Similarity" icon={<BarChart/>}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Similarity</th>
                                                    <th>Account 1</th>
                                                    <th>Account 2</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result['pairwise_sim'].map((u_pair : any) => {
                                                    return (
                                                        <tr>
                                                            <td>{`${+(u_pair.sim * 100).toFixed(1)}%`}</td>
                                                            <td>{u_pair.user_pair[0]}</td>
                                                            <td>{u_pair.user_pair[1]}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </Card>
                                </>
                            }
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        console.log("Failed generation");
        return (
            <div className={style.contentHeader}>
                <div>
                    <h1>Analysis Failed</h1>
                        <p>Unable to generate BLOC analysis results for the following accounts:  {result['query'].join(', ')}</p>
                        {result['errors'].map((error : Record<string, string>) => {
                            return (
                                <div key={error['account_username']}>
                                    {error['account_username'] ? 
                                        (
                                            <h3>Error: <span className={style.specialText}>{error['account_username']}</span></h3>
                                        ) : (
                                            <h3>Error</h3>
                                    )}
                                    <p>Unable to analyze account due to <em>{error['error_title']}</em>.</p>
                                    <p>Details: <em>{error['error_detail']}</em></p>
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    }
}

export default Results;