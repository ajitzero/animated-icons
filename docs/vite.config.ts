/// <reference types="vitest" />
import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		root: __dirname,
		cacheDir: `../node_modules/.vite`,
		build: {
			outDir: '../dist/./docs/client',
			reportCompressedSize: true,
			target: ['es2020'],
		},
		server: {
			fs: {
				allow: ['.'],
			},
		},
		plugins: [
			analog({
				liveReload: true,
				ssr: false,
				static: true,
			}),
			nxViteTsPaths(),
		],
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['src/test-setup.ts'],
			include: ['**/*.spec.ts'],
			reporters: ['default'],
		},
	};
});
