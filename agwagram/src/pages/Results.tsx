import React, { useContext } from 'react';
import { AnalysisContext } from '../contexts/AnalysisContext';

const Results: React.FC = () => {
    const {
        results
    } = useContext(AnalysisContext);
    return (
        <div>
            <h1>Results</h1>
            <p>
                {String(results)}
            </p>
        </div>
    );
}

export default Results;
