import React, { useContext } from 'react';
import style from './Results.module.scss'
import { AnalysisContext } from '../contexts/AnalysisContext';
import BarChart from '../images/icons/bar_chart.svg?react';
import Card from '../components/Card';

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
                            <Card title = "Action Analysis" icon={<BarChart/>}>
                                <p>
                                    {String(account.bloc_action)}
                                    {/*{% for char in account.bloc_action %}
                                        <div className={style.hoverableText}>{{ char }}
                                            {% if char|get_description != '' %}
                                                <span className={style.hoverable-tooltip">{{ char|get_description }}</span>
                                            {% endif %}
                                        </div>
                                        {% endfor %}*/}
                                </p>
                            </Card>
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
