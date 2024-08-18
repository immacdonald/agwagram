import { Card, formatNumber, formatReadableDate, Grid, GridItemSize, Heading, PersonFilledIcon, Row, useIsVisible, Text, useResponsiveContext } from 'phantom-library';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ChangeCard, ChangeProfileCard, GridViewCard, LanguageCard, LinkedDataCard, SumgramsCard, TopWordsCard, TopWordsCategoryCard } from '@components';
import style from './AccountAnalysis.module.scss';

interface AccountAnalysisProps {
    account: AccountBloc;
}

const AccountAnalysis: React.FC<AccountAnalysisProps> = ({ account }) => {
    const expertMode = false;

    const { isMobile } = useResponsiveContext();

    const ref = useRef<HTMLDivElement>(null);
    const isTitleCardVisible = useIsVisible(ref);

    return (
        <>
            {!isTitleCardVisible && ref.current && (
                <Row className={style.subtitle} align="center">
                    <span>
                        {!isMobile && `Analyzing `}@{account.account_username}
                    </span>
                </Row>
            )}
            <Grid>
                <Grid.Item size={GridItemSize.Full}>
                    <Card ref={ref}>
                        <Card.Header title="Account Overview" Icon={PersonFilledIcon} />
                        <Card.Body>
                            <Heading
                                title={
                                    <>
                                        @{account.account_username}{' '}
                                        <Link to={`https://www.twitter.com/${account.account_username}`} target="_blank">
                                            <i>({account.account_name})</i>
                                        </Link>
                                    </>
                                }
                                bold={false}
                            />
                            <Text>
                                {account.tweet_count > 0
                                    ? `Results generated using ${formatNumber(account.tweet_count)} tweets from ${formatReadableDate(account.first_tweet_date)} to ${formatReadableDate(account.last_tweet_date)}`
                                    : `No results generated due to finding 0 tweets`}
                            </Text>
                            {account.elapsed_time > 0 && <Text>Analysis process took {account.elapsed_time} seconds to complete</Text>}
                        </Card.Body>
                    </Card>
                </Grid.Item>
                <Grid.Item size={GridItemSize.Wide}>
                    <TopWordsCard title="Top Behaviors" subtitle="Most dominant action & content behaviors." top={account.top_bloc_words} />
                </Grid.Item>
                <Grid.Item size={GridItemSize.Wide}>
                    <TopWordsCategoryCard title="Top Pauses" subtitle="Most frequent pauses between actions." top={account.top_time} symbolLabel="Pause" />
                </Grid.Item>
                <Grid.Item size={GridItemSize.Full}>
                    <SumgramsCard title="Sumgrams" subtitle="Most frequently used phrases." sumgrams={account.sumgrams} />
                </Grid.Item>
                <Grid.Item size={GridItemSize.Full}>
                    <GridViewCard title="Grid View" username={account.account_username} data={account.linked_data} />
                </Grid.Item>
                {account.change_report.action && <ChangeProfileCard title="Change Profile Details" reports={account.change_report} />}
                {account.change_report.action && <ChangeCard title="Action Change Profile" report={account.change_report.action} />}
                {account.change_report.content_syntactic && <ChangeCard title="Syntactic Change Profile" report={account.change_report.content_syntactic} />}
                {expertMode ? (
                    <>
                        <LanguageCard title="Action" bloc={account.bloc_action} />
                        <LanguageCard title="Syntactic" bloc={account.bloc_syntactic} />
                        <LanguageCard title="Semantic Entity" bloc={account.bloc_semantic_entity} />
                        <LanguageCard title="Semantic Sentiment" bloc={account.bloc_semantic_sentiment} />
                        <LanguageCard title="Change" bloc={account.bloc_change} />
                        <LinkedDataCard title="LinkedData" data={account.linked_data} />
                    </>
                ) : (
                    false
                )}
            </Grid>
        </>
    );
};

export { AccountAnalysis };
