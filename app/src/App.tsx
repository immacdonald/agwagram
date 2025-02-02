import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyledApp } from 'phantom-library';
import { About, Home } from '@views';
import { useAnalytics } from './hooks/useAnalytics';

const App: FC = () => {
    useAnalytics('/tools/agwagram');

    return (
        <StyledApp anchors>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </StyledApp>
    );
};

export { App };
