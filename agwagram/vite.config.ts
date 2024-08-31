import react from '@vitejs/plugin-react';
import { defineConfig, Plugin, UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
// eslint-disable-next-line import-x/no-default-export
export default defineConfig(({ command }) => {
    if (command === 'serve') {
        return devConfig();
    } else if (command === 'build') {
        return prodConfig();
    } else {
        console.warn('Invalid build command provided, using fallback dev config');
        return devConfig();
    }
});

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const globalSCSS = () => ({
    name: 'vite-global-scss',
    enforce: 'pre',
    transform(content: string, id: string) {
        // Check if the file being processed is an SCSS file
        const filePath = path.parse(id);
        // Must check the base file path as an includes as the built version of .scss files is suffixed with ?used
        if (!filePath.root.includes('node_modules') && filePath.base.includes('.scss')) {
            // Exclude any SCSS partials
            if (!filePath.base.startsWith('_')) {
                const prepend = `@use "${path.resolve(__dirname, './src/styles')}" as *;`;
                const modifiedCSS = prepend + '\n' + content;
                return {
                    code: modifiedCSS,
                    map: null
                };
            }
        }
        // Return null for other types of files to indicate no transformation
        return null;
    }
});

const baseConfig: UserConfig = {
    plugins: [tsconfigPaths(), globalSCSS() as Plugin, svgr(), react()],
    base: '/tools/agwagram',
    server: {
        watch: {
            usePolling: true
        },
        host: true, // Here
        strictPort: true,
        port: 8000
    }
};

function devConfig(): UserConfig {
    return {
        ...baseConfig
    };
}

function prodConfig(): UserConfig {
    return {
        ...baseConfig
    };
}
/* eslint-enable @typescript-eslint/explicit-function-return-type */
