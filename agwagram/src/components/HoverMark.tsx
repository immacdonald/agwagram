import style from './HoverMark.module.scss';

interface HoverMarkProps {
    text: string
}

function HoverMark({ text, ...rest }: HoverMarkProps) {
    return (
        <mark className={style.hoverMark} {...rest}>{text}</mark>
    );
}

export default HoverMark;
