import { global } from './global';

const production = {
    ...global,
    mode: 'production'
};

export { production };
