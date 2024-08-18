import React, { useMemo } from 'react';
import { BarChartIcon, Card, Tab, TabGroup, Text } from 'phantom-library';
import { useSelector } from 'react-redux';
import { selectResults } from '@data/settingsSlice';
import { AccountAnalysis } from './AccountAnalysis';
import { GroupAnalysis } from './GroupAnalysis';

const Results: React.FC = () => {
    const resultState = useSelector(selectResults);

    const results = useMemo(() => {
        return resultState.data;
    }, [resultState]);

    if (results?.total_tweets) {
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
    }

    return (
        <Card>
            <Card.Header title="Analysis Failed" Icon={BarChartIcon} />
            <Card.Body>
                <Text>Unable to generate BLOC analysis results.</Text>
                {results && <Text>{results.error}</Text>}
            </Card.Body>
        </Card>
    );
};

export { Results };
