import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { persistor, store } from './data/store.ts';
import '@imacdonald/phantom/style/variables'
import './index.module.scss';
import { ResponsiveContextProvider } from '@imacdonald/phantom';

ReactDOM.createRoot(document.getElementById('root')!).render(
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
