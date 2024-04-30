import { GroupFilled } from "@imacdonald/phantom";
import { Card, CardSize, GroupChangeCard, TopWordsCard, TopWordsCategoryCard } from "../components/cards";
import { Hub } from "../icons";

interface GroupAnalysisProps {
    accounts: AccountBloc[];
    totalTweets: number;
    topBlocWords: any;
    topTimes: any;
    pairwiseSim: any;
}

const GroupAnalysis: React.FC<GroupAnalysisProps> = ({ accounts, totalTweets, topBlocWords, topTimes, pairwiseSim }) => {
    return (
        <>
            <Card title="Accounts Overview" Icon={GroupFilled} size={CardSize.Full}>
                <h2>Analysis of {accounts.map((account: any) => `@${account.account_username}`).join(', ')}</h2>
                <p>Results for {accounts.map((account: any) => <span><b>@{account.account_username}</b> ({account.account_name}), </span>)}generated using {totalTweets} tweets.</p>
            </Card>
            <TopWordsCard
                title="Top 100 Behaviors"
                subtitle="Displays the top 100 (or less) BLOC words between all the accounts analyzed."
                top={topBlocWords}
            />
            <TopWordsCategoryCard
                title="Top Pauses"
                subtitle="Most frequent durations of pause between activities of each account."
                top={topTimes}
                symbolLabel="Pause"
            />
            <Card title="Pairwise Similarity" Icon={Hub}>
                <table>
                    <thead>
                        <tr>
                            <th>Similarity</th>
                            <th>Account 1</th>
                            <th>Account 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pairwiseSim.map((u_pair: any, index: number) => {
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
            </Card>
            <GroupChangeCard title="Comparative Change Between Accounts" reports={accounts} />
        </>
    );
}

export { GroupAnalysis }