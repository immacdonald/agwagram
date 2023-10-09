import DynamicLink from './DynamicLink';
import style from './Header.module.scss';
import Logo from '../static/images/agwagram.png';

function Header() {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <div className={style.logo}>
                    <img src={Logo} />
                </div>
                <div className={style.navigation}>
                    <nav className={style.navLinks}>
                        <DynamicLink link="/" label="Home" />
                        <DynamicLink link="/analyze" label="Analyze" />
                        <DynamicLink link="/methodology" label="Methodology" />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
