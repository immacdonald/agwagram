import React, { useContext, Fragment } from 'react';
import { AnalysisContext } from '../contexts/AnalysisContext';
import HoverMark from './HoverMark';

interface BLOCTooltipProps {
    word: string;
}

export const DefinitionTooltip: React.FC<BLOCTooltipProps> = ({ word }: BLOCTooltipProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);
    return (
        [...word].map((c, index) => (
            <Fragment key={index}>
                {symbolToDefinition(c) != '' ? (<HoverMark text={c} data-title={symbolToDefinition(c)} />) : (<span>{c}</span>)}
            </Fragment>
        ))
    )
}

export const SymbolTooltip: React.FC<BLOCTooltipProps> = ({ word }: BLOCTooltipProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);
    return (
        [...word].map((c, index, array) => (
            <Fragment key={index}>
                {symbolToDefinition(c) != '' ? (<HoverMark text={symbolToDefinition(c)} data-title={c} />) : (<span>{symbolToDefinition(c)}</span>)}
                {index !== array.length - 1 && ", "}
            </Fragment>
        ))
    )
}