import { useGetSymbolsQuery } from '@data/apiSlice';
import { symbolToDefinition } from './bloc';

const GetDefinition = (word: string) => {
    const { data: symbols } = useGetSymbolsQuery();

    const result = Array.from(word)
        .map((char) => symbolToDefinition(symbols, char))
        .join(', ');

    return result;
};

export { GetDefinition };
