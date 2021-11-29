import { defineConfig } from 'vite'

const VITE_BASE = process.env.VITE_BASE || '';

export default defineConfig({
    root: './src/',
    build: {
        outDir: '../dist'
    },
    server: {
        open: true
    },
    base: VITE_BASE,
    resolve: {
        alias: [
            {
                find: /^~.+/,
                replacement: (val) => {
                    return val.replace(/^~/, "");
                },
            },
        ]
    }
})
