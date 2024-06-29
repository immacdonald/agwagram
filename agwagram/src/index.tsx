import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App.tsx';
import { persistor, store } from './data/store.ts';
import 'phantom-library/styles';
import './styles/core.module.scss';
import { ResponsiveContextProvider } from 'phantom-library';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ResponsiveContextProvider>
                    <BrowserRouter basename={import.meta.env.BASE_URL}>
                        <App />
                    </BrowserRouter>
                </ResponsiveContextProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
