import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import Footer from './components/Page/Footer';
import Header from './components/Page/Header';
import { selectTheme } from './data/settingsSlice';
import { Home } from './views';

function App() {
	const theme = useSelector(selectTheme);

	useEffect(() => {
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	}, [theme]);

	return (
		<div className={style.app}>
			<Header />
			<Routes>
				<Route path="/" Component={Home} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
