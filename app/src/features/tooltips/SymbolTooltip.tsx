import { FC, Fragment } from 'react';
import { HoverMark } from 'phantom-library';
import { useGetSymbolsQuery } from '@data/apiSlice';
import { BLOCTooltipProps, symbolToDefinition } from './bloc';

const SymbolTooltip: FC<BLOCTooltipProps> = ({ word, keyPrefix }) => {
    const { data: symbols } = useGetSymbolsQuery();

    return Array.from(new Set([...word])).map((c, index, array) => (
        <Fragment key={keyPrefix ? `${keyPrefix}-${index}` : index}>
            {symbolToDefinition(symbols, c) != '' ? <HoverMark text={<em>{symbolToDefinition(symbols, c)}</em>} data-tooltip={c} /> : <span>{symbolToDefinition(symbols, c)}</span>}
            {index !== array.length - 1 && ', '}
        </Fragment>
    ));
};

export { SymbolTooltip };
