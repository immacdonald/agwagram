import React, { useState, useEffect, createContext, useMemo, ReactNode } from 'react';
import { API_URL } from '../Global';

interface AnalysisContextValue {
    results: any | null;
    setResults: React.Dispatch<React.SetStateAction<any | null>>;
    symbols: any | null;
    setSymbols: React.Dispatch<React.SetStateAction<any | null>>;
    symbolToDefinition : (bloc: string) => string;
    setTheme: Function;
}

export const AnalysisContext = createContext<AnalysisContextValue>({
    results: null,
    setResults: () => {},
    symbols: null,
    setSymbols: () => {},
    symbolToDefinition: () => "",
    setTheme: () => {},
});

interface AnalysisContextProviderProps {
    children: ReactNode;
}

export function AnalysisContextProvider(props: AnalysisContextProviderProps) {
    const { children } = props;

    const getInitialState = () => {
        const results = localStorage.getItem('analysis')
        return results ? JSON.parse(results) : null
    }

    const getSymbols = () => {
        fetch(`${API_URL}/symbols`)
            .then((response) => response.json())
            .then((data) => {
                // Update the component's state with the fetched data
                const symbols = JSON.parse(data["result"]);
                setSymbols(symbols);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    };

    const [results, setResults] = useState<any | null>(getInitialState);
    const [symbols, setSymbols] = useState<any | null>(getSymbols);
    const [lightTheme, setLightTheme] = useState<boolean>(true);

    const symbolToDefinition = (bloc: string) : string => {
        if (!symbols) {
            return ''
        };

        const definitions = [...bloc].map((c) => symbols[c]);
        return definitions.join(', ');
    }

    const setTheme = (light?: boolean) => {
        if (light == true) {
            setLightTheme(true);
        } else if (light === false) {
            setLightTheme(false);
        } else {
            setLightTheme(!lightTheme);
        }
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', lightTheme ? 'light' : 'dark');
    }, [lightTheme]);

    useEffect(() => {
        localStorage.setItem('analysis', JSON.stringify(results))
    }, [results])

    const value: AnalysisContextValue = useMemo(() => ({
        results, setResults, symbols, setSymbols, symbolToDefinition, setTheme
    }), [results, setResults, symbols, setSymbols, setTheme]);

    return (
        <AnalysisContext.Provider value={value}>
            {children}
        </AnalysisContext.Provider>
    );
}