import { Card, formatNumber, formatReadableDate, Grid, GridItemSize, PersonFilled } from 'phantom-library';
import { Link } from 'react-router-dom';
import { ChangeCard, ChangeProfileCard, GridViewCard, LanguageCard, LinkedDataCard, TopWordsCard, TopWordsCategoryCard } from '@components';

interface AccountAnalysisProps {
    account: AccountBloc;
}

const AccountAnalysis: React.FC<AccountAnalysisProps> = ({ account }) => {
    const expertMode = false;

    return (
        <Grid>
            <Grid.Item size={GridItemSize.Full}>
                <Card>
                    <Card.Header title="Account Overview" Icon={PersonFilled} />
                    <Card.Body>
                        <h2 id="results">
                            @{account.account_username}{' '}
                            <Link to={`https://www.twitter.com/${account.account_username}`} target="_blank">
                                <i>({account.account_name})</i>
                            </Link>
                        </h2>
                        <p>
                            {account.tweet_count > 0
                                ? `Results generated using ${formatNumber(account.tweet_count)} tweets from ${formatReadableDate(account.first_tweet_date)} to ${formatReadableDate(account.last_tweet_date)}`
                                : `No results generated due to finding 0 tweets`}
                        </p>
                        {account.elapsed_time > 0 && <p>Analysis process took {account.elapsed_time} seconds to complete</p>}
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
    );
};

export { AccountAnalysis };
