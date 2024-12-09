import { development } from './development';
import { production } from './production';

// Determine which config to export based on the environment
const config = import.meta.env.PROD ? production : development;

export { config };
