import classNames from 'classnames';
import React, { ReactNode } from 'react';
import style from './Section.module.scss';

interface SectionProps {
    floating?: boolean;
    inset?: boolean;
    alt?: boolean;
    highlight?: boolean;
    background?: string;
    children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ floating = false, inset = false, alt = false, highlight = false, background = undefined, children }) => {
    const sectionClass = classNames(style.section, {
        [style.floating]: floating,
        [style.inset]: inset,
        [style.alt]: alt && !highlight,
        [style.highlight]: highlight,
        [style.parallax]: !!background
    });

    return (
        <section className={sectionClass} style={background ? { backgroundImage: `url(${background})` } : undefined}>
            {children}
        </section>
    );
};

export default Section;
