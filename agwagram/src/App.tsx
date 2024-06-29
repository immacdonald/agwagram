import { PhantomApp } from 'phantom-library';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from '@components';
import { About, Home } from '@views';

const App = () => {
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
};

export { App };
