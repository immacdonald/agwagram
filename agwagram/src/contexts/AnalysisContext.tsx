import React, { useState, createContext, useMemo, ReactNode } from 'react';

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

    const [results, setResults] = useState<any | null>(null);

    const value: AnalysisContextValue = useMemo(() => ({
        results, setResults,
    }), [results, setResults]);

    return (
        <AnalysisContext.Provider value={value}>
            {children}
        </AnalysisContext.Provider>
    );
}