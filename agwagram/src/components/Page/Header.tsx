import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectTheme, setTheme } from '../../data/settingsSlice';
import Logo from '../../images/agwagram.png';
import Button from '../Input/Button';
import style from './Header.module.scss';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    function switchTheme() {
        const switchTo = theme == 'light' ? 'dark' : 'light';
        dispatch(setTheme(switchTo));
    }

    return (
        <header className={style.header}>
            <div className={style.content}>
                <Link to="/" className={style.logo}>
                    <img src={Logo} />
                </Link>
                <div className={style.navigation}>
                    <nav className={style.navLinks}>
                        <Button onClick={() => switchTheme()} label="Theme" />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
