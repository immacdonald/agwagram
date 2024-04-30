import { Button, Callback, PersonFilled } from "@imacdonald/phantom";
import { formatDate } from "../Global";
import { Card, CardSize, ChangeCard, ChangeProfileCard, GridCard, LanguageCard, LinkedDataCard, TopWordsCard, TopWordsCategoryCard } from "../components/cards";

interface AccountAnalysisProps {
    account: AccountBloc;
}

const AccountAnalysis: React.FC<AccountAnalysisProps> = ({ account }) => {
    const expertMode = false;

    return (
        <>
            <Card title="Account Overview" Icon={PersonFilled} size={CardSize.Full}>
                <h2 id="results">Analysis of @{account.account_username} (<i>{account.account_name}</i>)</h2>
                <p>
                    {account.tweet_count > 0 ? `Results generated using ${account.tweet_count} tweets from ${formatDate(account.first_tweet_date)} to ${formatDate(account.last_tweet_date)}` : `No results generated due to finding 0 tweets`}
                </p>
                {account.elapsed_time > 0 && <p>Analysis process took {account.elapsed_time} seconds to complete</p>}
            </Card>
            <TopWordsCard title="Top 100 Behaviors" subtitle="Displays the top 100 (or less) BLOC words." top={account.top_bloc_words} />
            <TopWordsCategoryCard title="Top Pauses" subtitle="Most frequent durations of pause between account activities." top={account.top_time} symbolLabel="Pause" />
            <GridCard title="Grid View" username={account.account_username} data={account.linked_data} />
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
        </>
    );
}

export { AccountAnalysis }