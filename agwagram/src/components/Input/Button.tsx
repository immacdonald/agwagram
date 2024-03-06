import classNames from 'classnames';
import React, { CSSProperties, MouseEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import style from './Button.module.scss';

type ButtonProps = {
    label?: string;
    size?: 'regular' | 'small' | 'large';
    full?: boolean;
    visual?: 'ghost' | 'outline' | 'filled';
    mode?: 'error';
    rounded?: boolean;
    Icon?: any;
    color?: boolean;
    smallIcon?: boolean;
    active?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    allowPropagation?: boolean;
    link?: string;
    isLoading?: boolean;
    customStyle?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Standard button attributes

const Button: React.FC<ButtonProps> = ({
    label,
    size = 'regular',
    full = false,
    visual = 'ghost',
    mode,
    rounded = false,
    Icon,
    color = false,
    smallIcon = false,
    active = false,
    onClick,
    allowPropagation = false,
    link,
    isLoading = false,
    customStyle,
    ...rest
}) => {
    const buttonClasses = classNames(style.button, {
        [style.large]: size == 'large',
        [style.small]: size == 'small',
        [style.full]: full,
        [style.ghost]: visual == 'ghost',
        [style.outline]: visual == 'outline',
        [style.filled]: visual == 'filled',
        [style.rounded]: rounded,
        [style.color]: color,
        [style.hasLabel]: !!label,
        //[style.hasIcon]: !!icon,
        [style.smallIcon]: smallIcon,
        [style.loading]: isLoading,
        [style.active]: active,
        [customStyle ? customStyle : '']: !!customStyle
    });

    const navigate = useNavigate();

    const handleMouseClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (!allowPropagation) {
            e.stopPropagation();
        }

        if (onClick != undefined) {
            onClick(e);
        } else if (link != undefined) {
            navigate(link);
        }
    };

    const visibility = useMemo(() => (isLoading ? ({ visibility: 'hidden' } as CSSProperties) : undefined), [isLoading]);

    return (
        <button className={buttonClasses} type="button" data-mode={mode} onClick={handleMouseClick} {...rest}>
            {Icon && <Icon />}
            {label && <span style={visibility}>{label}</span>}
            {isLoading && <Loading size={24} thickness={3} color="inherit" secondaryColor="inherit" />}
        </button>
    );
};

export default Button;
