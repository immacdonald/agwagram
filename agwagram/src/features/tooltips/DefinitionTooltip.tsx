import { FC, Fragment } from 'react';
import { HoverMark } from 'phantom-library';
import { useGetSymbolsQuery } from '@data/apiSlice';
import { BLOCTooltipProps, symbolToDefinition } from './bloc';

const DefinitionTooltip: FC<BLOCTooltipProps> = ({ word, keyPrefix }) => {
    const { data: symbols } = useGetSymbolsQuery();

    return [...word].map((c, index) => (
        <Fragment key={keyPrefix ? `${keyPrefix}-${index}` : index}>
            {symbolToDefinition(symbols, c) != '' ? <HoverMark text={<em>{c}</em>} data-tooltip={symbolToDefinition(symbols, c)} /> : <span>{c}</span>}
        </Fragment>
    ));
};

export { DefinitionTooltip };
