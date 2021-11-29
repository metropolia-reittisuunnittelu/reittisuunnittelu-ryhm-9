import { defineConfig } from 'vite'

export default defineConfig({
    root: './src/',
    build: {
        outDir: '../dist'
    },
    server: {
        open: true
    },
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
