import { Link } from 'react-router-dom';
import Logo from "../../images/agwagram.png";
import style from './Header.module.scss';
import { useContext } from 'react';
import { AnalysisContext } from '../../contexts/AnalysisContext';
import Button from '../Input/Button';

const Header: React.FC = () => {
    const { setTheme } = useContext(AnalysisContext);

    return (
        <header className={style.header}>
            <div className={style.content}>
                <Link to="/" className={style.logo}>
                    <img src={Logo} />
                </Link>
                <div className={style.navigation}>
                    <nav className={style.navLinks}>
                        <Button onClick={() => setTheme()} label="Theme" />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
