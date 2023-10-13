import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.module.scss';
import { AnalysisContextProvider } from './contexts/AnalysisContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AnalysisContextProvider>
                <App />
            </AnalysisContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
