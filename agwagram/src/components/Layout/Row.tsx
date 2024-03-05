import React, { ReactNode } from 'react';
import style from './Row.module.scss';

interface RowProps {
    children?: ReactNode;
    align?: 'center' | 'left' | 'right';
}

const Row: React.FC<RowProps> = ({ children, align = 'center' }) => {
    return (
        <div className={style.row} style={{ justifyContent: align }}>
            {children}
        </div>
    );
};

export default Row;
