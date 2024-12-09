import { designTokens, PhantomDesignTokens } from 'phantom-library';
import styleTokens from './tokens.module.scss';

interface DesignTokens extends PhantomDesignTokens {
    graph: {
        blue: string;
        red: string;
        yellow: string;
        green: string;
    };
}

const tokens: DesignTokens = {
    graph: {
        blue: styleTokens['graph-blue'],
        red: styleTokens['graph-red'],
        yellow: styleTokens['graph-yellow'],
        green: styleTokens['graph-green']
    },
    ...designTokens
};

export { tokens };
