import { prisma } from '../utils/prisma';
import type { Actions, PageServerLoad } from './$types';

// LOAD DATA ----------------------------------------------------------
export const load: PageServerLoad = async () => {
	try {
		const post = await prisma.post.findMany({});
		const count = await prisma.post.count();
		console.log('count log:', count);
		// // need to use aggregate?

		return { post, count };
	} catch (error) {
		console.log(error);
	}
};

// when user gets page from server, this loads the data into the page itself, its not really an appi endpoint.

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
