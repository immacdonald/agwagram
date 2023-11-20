import DynamicLink from './DynamicLink';
import style from './Header.module.scss';
import Logo from '../images/agwagram.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <Link to='/' className={style.logo}>
                    <img src={Logo} />
                </Link>
                <div className={style.navigation}>
                    <nav className={style.navLinks}>
                        <DynamicLink link="/" label="Home" />
                        <DynamicLink link="/analyze" label="Analyze" secondaryLink="/analyze/results" />
                        <DynamicLink link="/methodology" label="Methodology" />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
