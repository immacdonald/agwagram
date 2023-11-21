import DynamicLink from './DynamicLink';
import style from './Header.module.scss';
import Logo from '../images/agwagram.png';
import { Link } from 'react-router-dom';
import { AnalysisContext } from '../contexts/AnalysisContext';
import { useContext } from 'react';

function Header() {
    const { setTheme } = useContext(AnalysisContext);

    return (
        <header className={style.header}>
            <div className={style.content}>
                <Link to='/' className={style.logo}>
                    <img src={Logo} />
                </Link>
                <nav className={style.navigation}>
                    <DynamicLink link="/" label="Home" />
                    <DynamicLink link="/analyze" label="Analyze" secondaryLink="/analyze/results" />
                    <DynamicLink link="/methodology" label="Methodology" />
                </nav>
                <div>
                    <button onClick={() => setTheme()}>
                        Theme
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
