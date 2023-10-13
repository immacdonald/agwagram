import React, { useState, useEffect, createContext, useMemo, ReactNode } from 'react';

interface AnalysisContextValue {
    results: any | null;
    setResults: React.Dispatch<React.SetStateAction<any | null>>;
}

export const AnalysisContext = createContext<AnalysisContextValue>({
    results: null,
    setResults: () => {},
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

    const [results, setResults] = useState<any | null>(getInitialState);

    useEffect(() => {
        localStorage.setItem('analysis', JSON.stringify(results))
    }, [results])

    const value: AnalysisContextValue = useMemo(() => ({
        results, setResults,
    }), [results, setResults]);

    return (
        <AnalysisContext.Provider value={value}>
            {children}
        </AnalysisContext.Provider>
    );
}