import {defineConfig} from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react'
import {nodePolyfills} from "vite-plugin-node-polyfills";
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.resolve();

const renderChunks = (deps: Record<string, string>) => {
    const chunks = {};
    Object.keys(deps).forEach((key) => {
        const array: string[] = ['react', 'react-router-dom', 'react-dom', 'pretendard'];
        if (array.includes(key)) {
            return;
        }
        chunks[key] = [key];
    });

    return chunks;
};

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        // 'global':  {},
        // 'process.env': {},
    },
    base: '/',
    plugins: [
        react(),
        tsconfigPaths(),
        // nodePolyfills({
        //     globals: {
        //         Buffer: true,
        //         global: true,
        //         process: true,
        //     },
        //     protocolImports: true,
        // })
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: path.resolve(__dirname, "src")
            },
            {
                find: "@components",
                replacement: path.resolve(__dirname, "src/components"),
            },
        ],

    },
    build: {
        rollupOptions: {
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                rollupNodePolyFill()
            ],
            output: {
                manualChunks: {
                    vendor: ['react', 'react-router-dom', 'react-dom', 'styled-components', 'lodash'],
                }
            }
        }
    },
    optimizeDeps: {
        exclude: ['js-big-decimal']
    }
})
