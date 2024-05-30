import React, { Fragment } from 'react';
import { useGetSymbolsQuery } from '../data/apiSlice';
import { HoverMark } from '@imacdonald/phantom';

interface BLOCTooltipProps {
	word: string;
	k?: string;
}

const symbolToDefinition = (symbols: Record<string, string> | undefined, bloc: string) => {
	if (!symbols) {
		return '';
	}

	const definitions = [...bloc].map((c) => symbols[c]);
	return definitions.join(', ');
};

export const DefinitionTooltip: React.FC<BLOCTooltipProps> = ({ word, k }: BLOCTooltipProps) => {
	const { data: symbols } = useGetSymbolsQuery();

	return [...word].map((c, index) => (
		<Fragment key={k ? `${k}-${index}` : index}>{symbolToDefinition(symbols, c) != '' ? <HoverMark text={<em>{c}</em>} data-title={symbolToDefinition(symbols, c)} /> : <span>{c}</span>}</Fragment>
	));
};

export const SymbolTooltip: React.FC<BLOCTooltipProps> = ({ word, k }: BLOCTooltipProps) => {
	const { data: symbols } = useGetSymbolsQuery();

	return [...word].map((c, index, array) => (
		<Fragment key={k ? `${k}-${index}` : index}>
			{symbolToDefinition(symbols, c) != '' ? <HoverMark text={<em>{symbolToDefinition(symbols, c)}</em>} data-title={c} /> : <span>{symbolToDefinition(symbols, c)}</span>}
			{index !== array.length - 1 && ', '}
		</Fragment>
	));
};

export const GetDefinition = (word: string) => {
	const { data: symbols } = useGetSymbolsQuery();

	const result = Array.from(word)
		.map((char) => symbolToDefinition(symbols, char))
		.join(', ');

	return result;
};
