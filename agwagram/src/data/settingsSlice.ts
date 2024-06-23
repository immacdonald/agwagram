import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../data/store';

interface ResultState {
    data: Analysis | null;
    loading: boolean;
    example: string | null;
}

interface SettingsState {
    theme: string;
    results: ResultState;
}

// Define the initial state
const initialState: SettingsState = {
    theme: 'light',
    results: {
        data: null,
        loading: false,
        example: null
    }
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.results = { ...state.results, loading: action.payload };
        },
        setExample: (state, action: PayloadAction<string | null>) => {
            state.results = { ...state.results, example: action.payload };
        },
        setResults: (state, action: PayloadAction<Analysis>) => {
            state.results = { ...state.results, loading: false, data: action.payload };
        },
        clearResults: (state) => {
            state.results = {
                data: null,
                loading: false,
                example: null
            };
        }
    }
});

export const { setTheme, setLoading, setExample, setResults, clearResults } = settingsSlice.actions;

// Selectors
export const selectTheme = (state: RootState): string => state.settings.theme;
export const selectResults = (state: RootState): ResultState => state.settings.results;

export default settingsSlice.reducer;
