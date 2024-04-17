import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import Footer from './components/Page/Footer';
import Header from './components/Page/Header';
import { selectTheme } from './data/settingsSlice';
import { About, Home } from './views';
import { AnchorController } from '@imacdonald/phantom';

function App() {
	const theme = useSelector(selectTheme);

	useEffect(() => {
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	}, [theme]);

	return (
		<div className={style.app}>
					<AnchorController/>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
