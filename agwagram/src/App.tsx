import { StyledApp } from 'phantom-library';
import { Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import { Footer, Header } from '@components';
import { About, Home } from '@views';
import { useAnalytics } from './hooks/useAnalytics';

const App: FC = () => {
    useAnalytics("/tools/agwagram");

    return (
        <StyledApp anchors>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </StyledApp>
    );
};

export { App };
