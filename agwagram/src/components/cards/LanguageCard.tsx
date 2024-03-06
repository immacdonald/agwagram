import { ReactNode } from 'react';
import { DefinitionTooltip } from '../BLOCComponents';
import Card, { CardSize } from './Card';
import style from './Card.module.scss';

interface LanguageCardProps {
    title: string;
    icon: ReactNode;
    bloc: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ title, icon, bloc }: LanguageCardProps) => {
    const chars = bloc.split('');
    return (
        <Card title={title} icon={icon} size={CardSize.Normal}>
            <div className={style.scrollable}>{chars.length > 0 ? chars.map((char, i) => <DefinitionTooltip key={i} word={char} />) : <p>No analysis available.</p>}</div>
        </Card>
    );
};

export default LanguageCard;
