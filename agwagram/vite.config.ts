import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    if (command === 'serve') {
        return devConfig();
    } else if (command === 'build') {
        return prodConfig();
    }
});

const baseConfig = {
    plugins: [svgr(), react()]
};

function devConfig() {
    return {
        ...baseConfig
    };
}

function prodConfig() {
    return {
        ...baseConfig,
        base: '/agwagram'
    };
}
