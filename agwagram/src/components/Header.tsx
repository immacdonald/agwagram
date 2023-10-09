import DynamicLink from './DynamicLink';
import style from './Header.module.scss';

function Header() {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <div className={style.logo}>Hollywood Director-Crew Networks</div>
                <div className={style.navigation}>
                    <nav className={style.navLinks}>
                        <DynamicLink link="/" label="Home" />
                        <DynamicLink link="/about" label="About" />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
