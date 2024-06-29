interface BLOCTooltipProps {
    word: string;
    keyPrefix?: string;
}

// Returns BLOC symbol
const symbolToDefinition = (symbols: Record<string, string> | undefined, bloc: string) => {
    if (!symbols) {
        return '';
    }

    const definitions = [...bloc].map((c) => symbols[c]);
    return definitions.join(', ');
};

export type { BLOCTooltipProps };
export { symbolToDefinition };
