import { SymbolTooltip } from '@features';
import { PauseIcon } from 'phantom-library';
import { Card } from '@components';

interface TopWordsCategoryCardProps {
    title: string;
    top: Top[];
    subtitle?: string;
    category?: string;
}

const TopWordsCategoryCard: React.FC<TopWordsCategoryCardProps> = ({ title, subtitle, top, category = 'Behavior' }: TopWordsCategoryCardProps) => {
    return (
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
    );
};

export { TopWordsCategoryCard };
