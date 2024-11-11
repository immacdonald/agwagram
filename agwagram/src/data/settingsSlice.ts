import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
interface ConfigState {
    changeReports?: boolean;
    sumgramLimit?: number;
    expertMode?: boolean;
}

interface AnalysisState {
    loading?: boolean;
    data?: Analysis;
    error?: string;
}

interface SettingsState {
    config: ConfigState;
    analysis: AnalysisState;
}

// Define the initial state
const initialState: SettingsState = {
    config: {
        changeReports: false,
        sumgramLimit: 1000,
        expertMode: false
    },
    analysis: {}
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setConfig: (state, action: PayloadAction<ConfigState>) => {
            state.config = { ...state.config, ...action.payload };
        },
        setAnalysis: (state, action: PayloadAction<AnalysisState | null>) => {
            if (action.payload) {
                state.analysis = action.payload;
            } else {
                state.analysis = {};
            }
        }
    }
});

export const { setConfig, setAnalysis } = settingsSlice.actions;

// Selectors
export const selectConfig = (state: RootState): ConfigState => state.settings.config;
export const selectAnalysis = (state: RootState): AnalysisState => state.settings.analysis;

const settingsReducer = settingsSlice.reducer;
export { settingsReducer };
