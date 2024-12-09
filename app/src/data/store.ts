import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './apiSlice';
import { settingsReducer } from './settingsSlice';

// Define the persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
};

// Combine reducers as usual
const rootReducer = combineReducers({
    settings: settingsReducer,
    api: api.reducer
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(api.middleware)
});

// Enable persistence support
const persistor = persistStore(store);

// Define the RootState type based on the store's reducer
export type RootState = ReturnType<typeof store.getState>;

// Export both the store and persistor
export { store, persistor };
