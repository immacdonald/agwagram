import style from './HoverMark.module.scss';

interface HoverMarkProps {
    text: string
}

function HoverMark({ text }: HoverMarkProps) {
    return (
        <mark className={style.hoverMark}>{text}</mark>
    );
}

export default HoverMark;
