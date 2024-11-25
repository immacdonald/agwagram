import { useState } from 'react';
import { DefinitionTooltip, SymbolTooltip } from '@features';
import { BarChartIcon, Card, Dropdown, NullablePrimitive } from 'phantom-library';

interface TopWordsCardProps {
    title: string;
    subtitle?: string;
    topAction: Top[];
    topContent: Top[];
}

const TopWordsCard: React.FC<TopWordsCardProps> = ({ title, subtitle, topAction, topContent }: TopWordsCardProps) => {
    const [top, setTop] = useState<Top[]>(topAction);
    const onCategoryChange = (selected: NullablePrimitive) => {
        if (selected == 'content') {
            setTop(topContent);
        } else {
            setTop(topAction);
        }
    };

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
                            <th style={{ width: '100px' }}>Behavior</th>
                            <th style={{ width: '90px' }}>Frequency</th>
                            <th style={{ width: '85px' }}>Rate (%)</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top.map((word: Top, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>
                                        <DefinitionTooltip word={word.term} />
                                    </td>
                                    <td>{word.term_freq}</td>
                                    <td>{word.term_rate}</td>
                                    <td style={{ textAlign: 'left' }}>
                                        <SymbolTooltip word={word.term} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
};

export { TopWordsCard };
