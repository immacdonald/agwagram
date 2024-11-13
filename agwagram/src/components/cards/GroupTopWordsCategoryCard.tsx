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
                                return <th>@{account.account_username} Rate</th>;
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
                                            return <td />;
                                        }

                                        const word = match[0];

                                        return <td>{word.term_rate}%</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
    /*return (
        <Card fullHeight>
            <Card.Header title={title} subtitle={subtitle} Icon={PauseIcon} />
            <Card.Body scrollable>
                <table>
                    <thead>
                        <tr>
                            <th>{category}</th>
                            <th style={{ width: '90px' }}>Frequency</th>
                            <th style={{ width: '85px' }}>Rate (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top.map((word: Top, i: number) => {
                            return (
                                <tr key={i}>
                                    <td style={{ textAlign: 'left' }}>
                                        <SymbolTooltip word={word.term} />
                                    </td>
                                    <td>{word.term_freq}</td>
                                    <td>{word.term_rate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );*/
};

export { GroupTopWordsCategoryCard };
