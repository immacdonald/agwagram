import { Button, Row } from '@imacdonald/phantom';
import style from './TabGroup.module.scss';
import { useState } from 'react';

interface TabGroupProps {
    tabs: React.ReactNode[]
    tabLabels: string[];
}

const TabGroup: React.FC<TabGroupProps> = ({ tabs, tabLabels }) => {
    if (tabs.length != tabLabels.length) {
        console.warn("Mismatch between tabs and tab labels");
    }

    const [tab, setTab] = useState<number>(0)

    return (
        <>
            <div className={style.row}>
                {tabLabels.map((label: string, index: number) => (
                    <Button key={index} full label={label} visual={tab == index ? 'filled' : 'ghost'} onClick={() => setTab(index)} customStyle={style.button}/>
                ))}
            </div>
            <br />
            {tabs[tab]}
        </>
    )
}

export { TabGroup };
