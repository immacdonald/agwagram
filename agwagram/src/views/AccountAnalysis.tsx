import { Card, formatNumber, formatReadableDate, AdaptiveGrid, AdaptiveGridItemSize, Heading, PersonFilledIcon, Row, useIsVisible, useResponsiveContext, Typography } from 'phantom-library';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { ChangeCard, ChangeProfileCard, GridViewCard, LanguageCard, LinkedDataCard, SumgramsCard, TopWordsCard, TopWordsCategoryCard } from '@components';
import { selectConfig } from '@data/settingsSlice';
import style from './AccountAnalysis.module.scss';

interface AccountAnalysisProps {
    account: AccountBloc;
}

const AccountAnalysis: React.FC<AccountAnalysisProps> = ({ account }) => {
    const analysisConfig = useSelector(selectConfig);
    const expertMode = analysisConfig.expertMode;

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
            <AdaptiveGrid>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                    <Card ref={ref}>
                        <Card.Header title="Account Overview" Icon={PersonFilledIcon} />
                        <Card.Body>
                            <Heading>
                                @{account.account_username}{' '}
                                <Link to={`https://www.twitter.com/${account.account_username}`} target="_blank">
                                    <i>({account.account_name})</i>
                                </Link>
                            </Heading>
                            <Typography.Paragraph>
                                {account.tweet_count > 0
                                    ? `Results generated using ${formatNumber(account.tweet_count)} tweets from ${formatReadableDate(account.first_tweet_date)} to ${formatReadableDate(account.last_tweet_date)}`
                                    : `No results generated due to finding 0 tweets`}
                            </Typography.Paragraph>
                            {account.elapsed_time > 0 && <Typography.Paragraph>Analysis process took {account.elapsed_time} seconds to complete</Typography.Paragraph>}
                        </Card.Body>
                    </Card>
                </AdaptiveGrid.Item>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                    <TopWordsCard title="Top Behaviors" subtitle="Most dominant action & content behaviors." top={account.top_bloc_words} />
                </AdaptiveGrid.Item>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                    <TopWordsCategoryCard title="Top Pauses" subtitle="Most frequent pauses between actions." top={account.top_time} />
                </AdaptiveGrid.Item>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                    <SumgramsCard title="Sumgrams" subtitle="Most frequently used phrases." sumgrams={account.sumgrams} />
                </AdaptiveGrid.Item>
                <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                    <GridViewCard title="Grid View" username={account.account_username} data={account.linked_data} />
                </AdaptiveGrid.Item>
                {account.change_report.action && (
                    <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                        <ChangeProfileCard title="Change Profile Details" reports={account.change_report} />
                    </AdaptiveGrid.Item>
                )}
                {account.change_report.action && (
                    <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                        <ChangeCard title="Action Change Profile" report={account.change_report.action!} />
                    </AdaptiveGrid.Item>
                )}
                {account.change_report.content_syntactic && (
                    <AdaptiveGrid.Item size={AdaptiveGridItemSize.Full}>
                        <ChangeCard title="Syntactic Change Profile" report={account.change_report.content_syntactic!} />
                    </AdaptiveGrid.Item>
                )}
                {expertMode ? (
                    <>
                        <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                            <LanguageCard title="Action" bloc={account.bloc_action} />
                        </AdaptiveGrid.Item>
                        <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                            <LanguageCard title="Syntactic" bloc={account.bloc_syntactic} />
                        </AdaptiveGrid.Item>
                        <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                            <LanguageCard title="Semantic Entity" bloc={account.bloc_semantic_entity} />
                        </AdaptiveGrid.Item>
                        <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                            <LanguageCard title="Semantic Sentiment" bloc={account.bloc_semantic_sentiment} />
                        </AdaptiveGrid.Item>
                        <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                            <LanguageCard title="Change" bloc={account.bloc_change} />
                        </AdaptiveGrid.Item>
                        <AdaptiveGrid.Item size={AdaptiveGridItemSize.Wide}>
                            <LinkedDataCard title="LinkedData" data={account.linked_data} />
                        </AdaptiveGrid.Item>
                    </>
                ) : (
                    false
                )}
            </AdaptiveGrid>
        </>
    );
};

export { AccountAnalysis };
