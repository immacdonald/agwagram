import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    if (command === 'serve') {
        return devConfig();
    } else if (command === 'build') {
        return prodConfig();
    }
});

const baseConfig = {
    plugins: [react()]
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
