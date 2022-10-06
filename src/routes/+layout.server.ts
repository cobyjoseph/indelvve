import type { LayoutServerLoad } from '.svelte-kit/types/src/routes/';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user
	};
};
