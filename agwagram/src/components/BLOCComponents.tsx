import React, { useContext, Fragment } from 'react';
import { AnalysisContext } from '../contexts/AnalysisContext';
import Tooltip from './Tooltip';
import HoverMark from './HoverMark';

interface BLOCTooltipProps {
    word: string;
}

export const DefinitionTooltip: React.FC<BLOCTooltipProps> = ({ word }: BLOCTooltipProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);
    return (
        [...word].map((c, index) => (
            <Fragment key={index}>
                <Tooltip content={symbolToDefinition(c)}>
                    <HoverMark text={c} />
                </Tooltip>
            </Fragment>
        ))
    )
}

export const SymbolTooltip: React.FC<BLOCTooltipProps> = ({ word }: BLOCTooltipProps) => {
    const { symbolToDefinition } = useContext(AnalysisContext);
    return (
        [...word].map((c, index, array) => (
            <Fragment key={index}>
                <Tooltip content={c}>
                    <HoverMark text={symbolToDefinition(c)} />
                </Tooltip>
                {index !== array.length - 1 && ", "}
            </Fragment>
        ))
    )
}