import React, { useContext, Fragment } from 'react';
import { AnalysisContext } from '../contexts/AnalysisContext';
import HoverMark from './HoverMark';

interface BLOCTooltipProps {
    word: string;
    k?: string;
}

export const DefinitionTooltip: React.FC<BLOCTooltipProps> = ({ word, k }: BLOCTooltipProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);
    return (
        [...word].map((c, index) => (
            <Fragment key={k ? `${k}-${index}` : index}>
                {symbolToDefinition(c) != '' ? (<HoverMark text={c} data-title={symbolToDefinition(c)} />) : (<span>{c}</span>)}
            </Fragment>
        ))
    )
}

export const SymbolTooltip: React.FC<BLOCTooltipProps> = ({ word, k }: BLOCTooltipProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);
    return (
        [...word].map((c, index, array) => (
            <Fragment key={k ? `${k}-${index}` : index}>
                {symbolToDefinition(c) != '' ? (<HoverMark text={symbolToDefinition(c)} data-title={c} />) : (<span>{symbolToDefinition(c)}</span>)}
                {index !== array.length - 1 && ", "}
            </Fragment>
        ))
    )
}

export const GetDefinition = (word : string) => {
    const { symbolToDefinition } = useContext(AnalysisContext);
    const result = Array.from(word)
        .map(char => symbolToDefinition(char))
        .join(", ");

    return result;
}