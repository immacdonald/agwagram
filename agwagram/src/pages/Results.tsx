import React, { useContext } from 'react';
import style from './Results.module.scss'
import { AnalysisContext } from '../contexts/AnalysisContext';

const Results: React.FC = () => {
    const {
        results
    } = useContext(AnalysisContext);

    const result = results.result;

    if (results && results['successful_generation']) {
        return (
            <div>
                <h1>Results</h1>
                <p>
                    {String(result)}
                </p>
            </div>
        );
    } else {
        return (
            <div className={style.contentHeader}>
                <div>
                    <h1>BLOC Analysis Failed</h1>
                        <p>Unable to generate results for the following accounts:  {result['query'].join(', ')}</p>
                        {result['errors'].map((error : Record<string, string>) => {
                            return (
                                <div key={error['account_username']}>
                                    {error['account_username'] ? (<h3>Error: <span className={style.specialText}>{error['account_username']}</span></h3>) : (<h3>Error</h3>)}
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
