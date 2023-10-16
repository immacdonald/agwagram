import React, { useContext } from 'react';
import style from './Results.module.scss'
import { AnalysisContext } from '../contexts/AnalysisContext';
import BarChart from '../images/icons/bar_chart.svg?react';
import Card, { CardSize, LanguageCard } from '../components/Card';

const Results: React.FC = () => {
    const {
        results
    } = useContext(AnalysisContext);

    const result = results.result;

    if (results && result['successful_generation']) {
        console.log("Successful generation");
        const accounts = result['account_blocs'];
        if (accounts.length === 1) {
            const account = accounts[0];
            return (
                <div className={style.content}>
                    <div className={style.contentHeader}>
                        <div>
                            <h1>
                                BLOC Analysis of <span className={style.specialText}>
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
                        </div>
                    </div>
                    <div className={style.contentMain}>
                        <div className={style.cardGrid}>
                            <Card title="Action Change Analysis" icon={<BarChart/>} size={CardSize.Wide}>
                                <p>
                                    <strong>Change Rates</strong>: {account.change_report['action'].change_profile.change_rate}
                                    <br />
                                    <strong>Average Change: </strong>
                                    Word: {account.change_report['action'].change_profile.average_change.word },
                                    Pause: {account.change_report['action'].change_profile.average_change.pause },
                                    Activity: {account.change_report['action'].change_profile.average_change.activity}
                                </p>
                                <hr />
                                <div className={style.scrollable}>
                                    <table>
                                        <tr>
                                            <th>Behaviour</th>
                                            <th style={{"width": "70px"}}>Pause</th>
                                            <th style={{"width": "70px"}}>Word</th>
                                            <th style={{"width": "70px"}}>Activity</th>
                                            <th style={{"width": "90px"}}>Start Date</th>
                                            <th style={{"width": "90px"}}>End Date</th>
                                        </tr>
                                        {account.change_report['action'].change_events.map((change_event : any) => {
                                            return (
                                                <tr>
                                                    <td>{change_event.first_segment.action} to {change_event.second_segment.action}</td>
                                                    <td>{change_event.change_profile.pause}</td>
                                                    <td>{change_event.change_profile.word}</td>
                                                    <td>{change_event.change_profile.activity}</td>
                                                    <td>{change_event.first_segment.local_dates[0]}</td>
                                                    <td>{change_event.second_segment.local_dates[0]}</td>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </div>
                            </Card>
                            <LanguageCard title = "Action" icon={<BarChart/>} bloc={account.bloc_action}/>
                            <LanguageCard title = "Content Syntactic" icon={<BarChart/>} bloc={account.bloc_syntactic}/>
                            <LanguageCard title = "Content Semantic Entity" icon={<BarChart/>} bloc={account.bloc_semantic_entity}/>
                            <LanguageCard title = "Content Semantic Sentiment" icon={<BarChart/>} bloc={account.bloc_semantic_sentiment}/>
                            <LanguageCard title = "Change" icon={<BarChart/>} bloc={account.bloc_change}/>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        console.log("Failed generation");
        return (
            <div className={style.contentHeader}>
                <div>
                    <h1>BLOC Analysis Failed</h1>
                        <p>Unable to generate results for the following accounts:  {result['query'].join(', ')}</p>
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
