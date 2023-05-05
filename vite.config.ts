import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {

  const isDevelopment = mode === 'development';

  return defineConfig({
    build: {
      outDir: 'dist',
      sourcemap: isDevelopment ? 'inline' : false,
      lib: {
        formats: ['es'],
        entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        name: '@patriarche/vue-hooks',
        fileName: 'index',
      },
      rollupOptions: {
        external: [
          'vue',
          'zod',
          'vue-router'
        ],
      },
      commonjsOptions: {
        esmExternals: true 
      },
      // Prevent DTS error on cleaning files while running a new generation
      emptyOutDir: false,
    },
    publicDir: false,
    plugins: [
      vue(), 
      dts({
        staticImport: true,
        insertTypesEntry: true,
        // https://github.com/qmhc/vite-plugin-dts/issues/153 (.json file imports here) 
        skipDiagnostics: true,
        outputDir: fileURLToPath(new URL('./dist/@types', import.meta.url)),
        include: [fileURLToPath(new URL('./src', import.meta.url))],
        tsConfigFilePath: fileURLToPath(new URL('./tsconfig.app.json', import.meta.url)),
      }),
    ],
    resolve: {
      alias: [
        {
          find: /@src/,
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  });
}