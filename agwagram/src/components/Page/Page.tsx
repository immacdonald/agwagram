import React, { ReactNode, useEffect } from 'react';
import style from './Page.module.scss';

interface PageProps {
    title?: string;
    children?: ReactNode;
}

const Page: React.FC<PageProps> = ({ title = 'Agwagram', children }: PageProps) => {
    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
    }, []);

    return <main className={style.page}>{children}</main>;
};

export default Page;
