import { Button, MoonFilledIcon, SunFilledIcon, useResponsiveContext } from 'phantom-library';
import { Link } from 'react-router-dom';
import { AgwagramIcon } from '@assets/icons';
import style from './Header.module.scss';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useResponsiveContext();

    return (
        <header className={style.header}>
            <div className={style.content}>
                <Link to="/" className={style.logo}>
                    <Button Icon={AgwagramIcon} rounded />
                    <span>
                        <b>agwagram</b>
                    </span>
                </Link>
                <div className={style.navigation}>
                    <nav className={style.navLinks}>
                        <Button link="/" label="Home" visual="text" />
                        <Button link="/about" label="About" visual="text" />
                        <Button rounded visual="text" onClick={() => toggleTheme()} Icon={theme == 'light' ? SunFilledIcon : MoonFilledIcon} />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export { Header };
