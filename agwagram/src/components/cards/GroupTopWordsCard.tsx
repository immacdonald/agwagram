import { FC, useMemo, useState } from 'react';
import { BarChartIcon, Card, Dropdown, NullablePrimitive } from 'phantom-library';
import { DefinitionTooltip } from '@components';

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
                                return <th>@{account.account_username} Behaviour</th>;
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
                                            return <td />;
                                        }

                                        const word = account[top][index];
                                        return (
                                            <td>
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