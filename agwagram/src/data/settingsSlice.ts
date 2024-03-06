import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../data/store';
import { api } from './apiSlice';

interface SettingsState {
    theme: string;
    results: any | null;
}

// Define the initial state
const initialState: SettingsState = {
    theme: 'light',
    results: null
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            const data = action.payload;
            state.theme = data;
        },
        clearResults: (state) => {
            state.results = null;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.setAnalyzeFiles.matchFulfilled, (state, action: PayloadAction<any>) => {
            state.results = action.payload;
        }),
            builder.addMatcher(api.endpoints.setAnalyzeUser.matchFulfilled, (state, action: PayloadAction<any>) => {
                state.results = action.payload;
            });
    }
});

export const { setTheme, clearResults } = settingsSlice.actions;

// Selectors
export const selectTheme = (state: RootState): string => state.settings.theme;
export const selectResults = (state: RootState): any => state.settings.results;

export default settingsSlice.reducer;
