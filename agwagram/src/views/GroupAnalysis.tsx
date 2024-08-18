import { Card, formatNumber, Grid, GridItemSize, GroupFilledIcon, Heading, HubIcon, Row, useIsVisible, Text, useResponsiveContext } from 'phantom-library';
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
            <Grid>
                <Grid.Item size={GridItemSize.Full}>
                    <Card ref={ref}>
                        <Card.Header title="Accounts Overview" Icon={GroupFilledIcon} />
                        <Card.Body>
                            <Heading title={<>{accounts.map((account: AccountBloc) => `@${account.account_username}`).join(', ')}</>} bold={false} />
                            <Text>
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
                            </Text>
                        </Card.Body>
                    </Card>
                </Grid.Item>
                <Grid.Item size={GridItemSize.Wide}>
                    <TopWordsCard title="Top 100 Behaviors" subtitle="Most dominant action & content behaviors." top={topBlocWords} />
                </Grid.Item>
                <Grid.Item size={GridItemSize.Wide}>
                    <TopWordsCategoryCard title="Top Pauses" subtitle="Most frequent pauses between actions." top={topTimes} symbolLabel="Pause" />
                </Grid.Item>
                <Grid.Item size={GridItemSize.Full}>
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
                </Grid.Item>
                {accounts[0].change_report.action && (
                    <Grid.Item size={GridItemSize.Full}>
                        <GroupChangeCard title="Comparative Change Between Accounts" reports={accounts} />
                    </Grid.Item>
                )}
                {accounts.map((account: AccountBloc) => (
                    <Grid.Item size={GridItemSize.Full} key={account.account_username}>
                        <SumgramsCard title={`Sumgrams for @${account.account_username}`} subtitle="Most frequently used phrases." sumgrams={account.sumgrams} />
                    </Grid.Item>
                ))}
                {accounts.map((account: AccountBloc) => (
                    <Grid.Item size={GridItemSize.Full} key={account.account_username}>
                        <GridViewCard title={`Grid View for @${account.account_username}`} username={account.account_username} data={account.linked_data} />
                    </Grid.Item>
                ))}
            </Grid>
        </>
    );
};

export { GroupAnalysis };
