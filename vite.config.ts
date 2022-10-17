import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	legacy: { buildSsrCjsExternalHeuristics: true }
};

export default config;
