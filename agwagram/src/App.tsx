import style from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Methodology from './pages/Methodology';
import Analyze from './pages/Analyze';
import Results from './pages/Results';

function App() {
    return (
        <div className={style.app}>
            <Header />
            <main className={style.content}>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/analyze" Component={Analyze} />
                    <Route path="/methodology" Component={Methodology} />
                    <Route path="/analyze/results" Component={Results} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
