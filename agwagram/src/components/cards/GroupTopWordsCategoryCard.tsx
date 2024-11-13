import { BarChartIcon, Card } from 'phantom-library';
import { SymbolTooltip } from '@components';

interface GroupTopWordsCategoryCardProps {
    title: string;
    subtitle?: string;
    accounts: AccountBloc[];
}

const timeSymbols = {
    '□': '< 1 Minute',
    '⚀': '< 1 Hour',
    '⚁': '< 1 Day',
    '⚂': '< 1 Week',
    '⚃': '< 1 Month',
    '⚄': '< 1 Year',
    '⚅': '> 1 Year'
};

const GroupTopWordsCategoryCard: React.FC<GroupTopWordsCategoryCardProps> = ({ title, subtitle, accounts }) => {
    const category = 'top_time';
    const categoryTitle = 'Pause';

    return (
        <Card fullHeight>
            <Card.Header title={title} subtitle={subtitle} Icon={BarChartIcon} />
            <Card.Body scrollable>
                <table>
                    <thead>
                        <tr>
                            <th>{categoryTitle}</th>
                            {accounts.map((account: AccountBloc) => {
                                return <th key={account.account_username}>@{account.account_username}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(timeSymbols).map((key, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <SymbolTooltip word={key} />
                                    </td>
                                    {accounts.map((account: AccountBloc) => {
                                        const match = account[category].filter((top) => top.term == key);
                                        if (match.length == 0) {
                                            return <td key={account.account_username} />;
                                        }

                                        const word = match[0];

                                        return <td key={account.account_username}>{word.term_rate}%</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
};

export { GroupTopWordsCategoryCard };
