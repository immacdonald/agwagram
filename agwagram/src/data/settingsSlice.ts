import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ResultState {
    data: Analysis | null;
    loading: boolean;
    example: string | null;
}

interface SettingsState {
    results: ResultState;
}

// Define the initial state
const initialState: SettingsState = {
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

export const { setLoading, setExample, setResults, clearResults } = settingsSlice.actions;

// Selectors
export const selectResults = (state: RootState): ResultState => state.settings.results;

const settingsReducer = settingsSlice.reducer;
export { settingsReducer };
