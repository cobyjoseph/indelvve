import { prisma } from '../utils/prisma';
import type { Actions, PageServerLoad } from './$types';

// LOAD DATA ----------------------------------------------------------
export const load: PageServerLoad = async () => {
	const post = await prisma.post.findMany({});

	return { post };
};

//---------------------------------------------------------------------

export const actions: Actions = {
	actionName: async ({ request }) => {
		const form = await request.formData();
		const inputVar = form.get('inputField');

		await prisma.post.create({
			data: {
				content: inputVar,
				upvoted_number: 34
			}
		});
	}
};
