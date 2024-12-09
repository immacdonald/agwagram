import React from 'react';
import { useSelector } from 'react-redux';
import { BarChartIcon, Tab, TabGroup, Typography } from 'phantom-library';
import { Card } from '@components';
import { selectAnalysis } from '@data/settingsSlice';
import { AccountAnalysis } from './AccountAnalysis';
import { GroupAnalysis } from './GroupAnalysis';

const Results: React.FC = () => {
    const { data: analysis, error } = useSelector(selectAnalysis);

    if (analysis && analysis.total_tweets) {
        const accounts = analysis.account_blocs;
        if (accounts.length === 1) {
            const account = accounts[0];
            return <AccountAnalysis account={account} />;
        } else {
            return (
                <TabGroup
                    variant="segmented"
                    tabs={[
                        {
                            label: 'Group Analysis',
                            tab: <GroupAnalysis accounts={accounts} totalTweets={analysis.total_tweets} pairwiseSim={analysis.pairwise_sim} />
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
                <Typography.Paragraph>Unable to generate BLOC analysis results.</Typography.Paragraph>
                <Typography.Paragraph>{analysis?.error ? analysis?.error : error ? error : 'An error has occured.'}</Typography.Paragraph>
            </Card.Body>
        </Card>
    );
};

export { Results };
