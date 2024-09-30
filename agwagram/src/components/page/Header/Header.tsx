import { Button, MoonFilledIcon, SimpleDynamicHeader, SunFilledIcon, useResponsiveContext } from 'phantom-library';
import { Link } from 'react-router-dom';
import { AgwagramIcon } from '@assets/icons';
import style from './Header.module.scss';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useResponsiveContext();

    return (
        <SimpleDynamicHeader pageSpace="pad" hasBackground>
            <div className={style.content}>
                <Link to="/" className={style.logo}>
                    <Button Icon={AgwagramIcon} rounded />
                    <span>
                        <b>agwagram</b>
                    </span>
                </Link>
                <div className={style.newslab}>
                    <span>A </span>
                    <b>
                        <Link to="https://newsresearch.lab.wm.edu" target="_blank">
                            NEWS Lab
                        </Link>
                    </b>
                    <span> Project</span>
                </div>
                <div className={style.navigation}>
                    <nav className={style.navLinks}>
                        <Button link="/" visual="text">
                            Home
                        </Button>
                        <Button link="/about" visual="text">
                            About
                        </Button>
                        <Button rounded visual="text" onClick={() => toggleTheme()} Icon={theme == 'light' ? SunFilledIcon : MoonFilledIcon} />
                    </nav>
                </div>
            </div>
        </SimpleDynamicHeader>
    );
};

export { Header };
