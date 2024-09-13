import { Card, formatNumber, AdaptiveGrid, AdaptiveGridItemSize, GroupFilledIcon, Heading, HubIcon, Row, useIsVisible, useResponsiveContext, Typography } from 'phantom-library';
import { Link } from 'react-router-dom';
import { Fragment, useRef } from 'react';
import { GridViewCard, GroupChangeCard, SumgramsCard, TopWordsCard, TopWordsCategoryCard } from '@components';
import style from './AccountAnalysis.module.scss';

interface GroupAnalysisProps {
    accounts: AccountBloc[];
    totalTweets: number;
    topBlocWords: Top[];
    topTimes: Top[];
    pairwiseSim: PairwiseSimilarity[];
}

const GroupAnalysis: React.FC<GroupAnalysisProps> = ({ accounts, totalTweets, topBlocWords, topTimes, pairwiseSim }) => {
    const { isMobile } = useResponsiveContext();

    const ref = useRef<HTMLDivElement>(null);
    const isTitleCardVisible = useIsVisible(ref);

    return (
        <>
            {!isTitleCardVisible && ref.current && (
                <Row className={style.subtitle} align="center">
                    <span>
                        {!isMobile && `Analyzing `}
                        {accounts.map((account: AccountBloc, index: number) => (
                            <Fragment key={index}>@{account.account_username} </Fragment>
                        ))}
                    </span>
                </Row>
            )}
            <AdaptiveGrid>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                    <Card ref={ref}>
                        <Card.Header title="Accounts Overview" Icon={GroupFilledIcon} />
                        <Card.Body>
                            <Heading>
                                {accounts.map((account: AccountBloc) => `@${account.account_username}`).join(', ')}
                            </Heading>
                            <Typography.Paragraph>
                                Results for{' '}
                                {accounts.map((account: AccountBloc, index: number) => (
                                    <span key={index}>
                                        @{account.account_username}{' '}
                                        <Link to={`www.twitter.com/${account.account_username}`}>
                                            <i>({account.account_name})</i>
                                        </Link>
                                        ,{' '}
                                    </span>
                                ))}
                                generated using {formatNumber(totalTweets)} tweets.
                            </Typography.Paragraph>
                        </Card.Body>
                    </Card>
                </AdaptiveGrid.Item>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                    <TopWordsCard title="Top 100 Behaviors" subtitle="Most dominant action & content behaviors." top={topBlocWords} />
                </AdaptiveGrid.Item>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                    <TopWordsCategoryCard title="Top Pauses" subtitle="Most frequent pauses between actions." top={topTimes} symbolLabel="Pause" />
                </AdaptiveGrid.Item>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                    <Card>
                        <Card.Header title="Pairwise Similarity" Icon={HubIcon} />
                        <Card.Body>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Similarity</th>
                                        <th>Account 1</th>
                                        <th>Account 2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pairwiseSim.map((u_pair: PairwiseSimilarity, index: number) => {
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
                        </Card.Body>
                    </Card>
                </AdaptiveGrid.Item>
                {accounts[0].change_report.action && (
                    <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                        <GroupChangeCard title="Comparative Change Between Accounts" reports={accounts} />
                    </AdaptiveGrid.Item>
                )}
                {accounts.map((account: AccountBloc) => (
                    <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full} key={account.account_username}>
                        <SumgramsCard title={`Sumgrams for @${account.account_username}`} subtitle="Most frequently used phrases." sumgrams={account.sumgrams} />
                    </AdaptiveGrid.Item>
                ))}
                {accounts.map((account: AccountBloc) => (
                    <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full} key={account.account_username}>
                        <GridViewCard title={`AdaptiveGrid View for @${account.account_username}`} username={account.account_username} data={account.linked_data} />
                    </AdaptiveGrid.Item>
                ))}
            </AdaptiveGrid>
        </>
    );
};

export { GroupAnalysis };
