import { Button, designTokens, DynamicHeader, MoonFilledIcon, SunFilledIcon, useResponsiveContext } from 'phantom-library';
import { Link } from 'react-router-dom';
import { AgwagramIcon } from '@assets/icons';
import style from './Header.module.scss';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useResponsiveContext();

    return (
        <DynamicHeader pageSpace="pad" hasBackground style={{paddingInline: designTokens.space.sm}}>
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
                        <Button link="/" variant="text">
                            Home
                        </Button>
                        <Button link="/about" variant="text">
                            About
                        </Button>
                        <Button rounded variant="text" onClick={() => toggleTheme()} Icon={theme == 'light' ? SunFilledIcon : MoonFilledIcon} />
                    </nav>
                </div>
            </div>
        </DynamicHeader>
    );
};

export { Header };
