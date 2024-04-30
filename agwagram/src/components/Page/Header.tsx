import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectTheme, setTheme } from '../../data/settingsSlice';
import { Button, MoonFilled, SunFilled } from '@imacdonald/phantom';
import style from './Header.module.scss';
import { AgwagramIcon } from '../../icons';

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
					<Button Icon={AgwagramIcon} rounded/>
					<span><b>Agwagram</b></span>
				</Link>
				<div className={style.navigation}>
					<nav className={style.navLinks}>
						<Button link="/" label="Home" />
						<Button link="/about" label="About" />
						<Button rounded onClick={() => switchTheme()} Icon={theme == 'light' ? SunFilled : MoonFilled} />
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
