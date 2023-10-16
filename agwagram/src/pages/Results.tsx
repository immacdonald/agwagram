import React, { useState, useContext } from 'react';
import style from './Results.module.scss'
import { AnalysisContext } from '../contexts/AnalysisContext';
import BarChart from '../images/icons/bar_chart.svg?react';
import Card, { CardSize, ChangeCard, LanguageCard } from '../components/Card';

const Results: React.FC = () => {
    const {
        results
    } = useContext(AnalysisContext);

    const result = results.result;

    const [expertMode, setExpertMode] = useState<boolean>(true);

    const handleExpertToggle = () => {
        setExpertMode(!expertMode);
    }

    if (results && result['successful_generation']) {
        console.log("Successful generation");
        const accounts = result['account_blocs'];
        if (accounts.length === 1) {
            const account = accounts[0];
            const top_words : Record<string,string>[] = account.top_bloc_words
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
                            Expert Mode: <input type="checkbox" onChange={handleExpertToggle} checked={expertMode} />
                        </div>
                    </div>
                    <div className={style.contentMain}>
                        <div className={style.cardGrid}>
                            <Card title="Top 100 Actions/Contents" icon={<BarChart/>} size={CardSize.Wide}>
                                <p>Displays the top 100 (or less) BLOC words.</p>
                                <div className={style.scrollable}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{"width": "50px"}}>Rank</th>
                                                <th style={{"width": "100px"}}>Word</th>
                                                <th style={{"width": "90px"}}>Frequency</th>
                                                <th style={{"width": "70px"}}>Rate (%)</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {top_words.map((word : Record<string, string>) => {
                                            return (
                                                <tr>
                                                    <td>{word.rank}.</td>
                                                    <td>{word.term}
                                                        {/*% for char in word.term
                                                            <div class="hoverable-text">
                                                                {{ char }}
                                                                <span class="hoverable-tooltip">{{ char|get_description }}</span>
                                                            </div>
                                                        */}
                                                    </td>
                                                    <td>{word.term_freq}</td>
                                                    <td>{word.term_rate}</td>
                                                    <td style={{"textAlign": "left"}}>{word.term}
                                                        {/*% for char in word.term %
                                                        <div class="hoverable-text">
                                                            {{ char|get_description }}
                                                            <span class="hoverable-tooltip">{{ char }}</span>
                                                        </div>
                                                        {% if not forloop.last %},&nbsp;{% endif %}
                                                    */}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                            <Card title="Top Pauses" icon={<BarChart/>} size={CardSize.Wide}>
                                <p>Most frequent durations of pause between account activities.</p>
                                <div className={style.scrollable}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{"width": "60px"}}>Pause</th>
                                            <th style={{"width": "90px"}}>Frequency</th>
                                            <th style={{"width": "70px"}}>Rate (%)</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {account.top_time.map((word : any) => {
                                        return (
                                            <tr>
                                                <td>{word.term}
                                                    {/*% for char in word.term %}
                                                        <div class="hoverable-text">
                                                            {{ char }}
                                                            <span class="hoverable-tooltip">{{ char|get_description }}</span>
                                                        </div>
                                                    {% endfor %*/}
                                                </td>
                                                <td>{word.term_freq}</td>
                                                <td>{word.term_rate}</td>
                                                <td style={{"textAlign": "left"}}>{word.term}
                                                    {/*% for char in word.term %}
                                                        <div class="hoverable-text">
                                                            {{ char|get_description }}
                                                            <span class="hoverable-tooltip">{{ char }}</span>
                                                        </div>
                                                        {% if not forloop.last %},&nbsp;{% endif %}
                                                {% endfor %*/}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                                </div>
                            </Card>
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