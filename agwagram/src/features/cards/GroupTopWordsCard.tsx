import { FC, useMemo, useState } from 'react';
import { DefinitionTooltip } from '@features';
import { BarChartIcon, Dropdown, NullablePrimitive } from 'phantom-library';
import { Card } from '@components';

interface GroupTopWordsCardProps {
    title: string;
    subtitle?: string;
    accounts: AccountBloc[];
}

const GroupTopWordsCard: FC<GroupTopWordsCardProps> = ({ title, subtitle, accounts }) => {
    const [top, setTop] = useState<'top_actions' | 'top_syntactic'>('top_actions');

    const onCategoryChange = (selected: NullablePrimitive) => {
        if (selected == 'content') {
            setTop('top_syntactic');
        } else {
            setTop('top_actions');
        }
    };

    const maxLength = useMemo(() => Math.max(...accounts.flatMap((account) => account[top].length)), [top]);

    return (
        <Card fullHeight>
            <Card.Header title={title} subtitle={subtitle} Icon={BarChartIcon} />
            <Card.Body scrollable>
                <Dropdown
                    options={[
                        { value: 'action', label: 'Action' },
                        { value: 'content', label: 'Content' }
                    ]}
                    onChange={onCategoryChange}
                    defaultValue="action"
                    isClearable={false}
                />
                <br />
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '55px' }}>Rank</th>
                            {accounts.map((account: AccountBloc) => {
                                return <th key={account.account_username}>@{account.account_username}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(maxLength)].map((_, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    {accounts.map((account: AccountBloc) => {
                                        if (index >= account[top].length) {
                                            return <td key={account.account_username} />;
                                        }

                                        const word = account[top][index];
                                        return (
                                            <td key={account.account_username}>
                                                <DefinitionTooltip word={word.term} />
                                            </td>
                                        );
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

export { GroupTopWordsCard };
