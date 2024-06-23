import { useEffect } from 'react';
import { PhantomApp } from 'phantom-library';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Page/Footer';
import Header from './components/Page/Header';
import { selectTheme } from './data/settingsSlice';
import { About, Home } from './views';

function App() {
    const theme = useSelector(selectTheme);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return (
        <PhantomApp anchors>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </PhantomApp>
    );
}

export default App;
