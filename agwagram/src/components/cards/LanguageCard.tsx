import { Card, DatasetIcon, Text } from 'phantom-library';
import { DefinitionTooltip } from '@components';

interface LanguageCardProps {
    title: string;
    bloc: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ title, bloc }: LanguageCardProps) => {
    const chars = bloc.split('');
    return (
        <Card fullHeight>
            <Card.Header title={title} Icon={DatasetIcon} />
            <Card.Body scrollable>{chars.length > 0 ? chars.map((char, i) => <DefinitionTooltip key={i} word={char} />) : <Text>No analysis available.</Text>}</Card.Body>
        </Card>
    );
};

export { LanguageCard };
