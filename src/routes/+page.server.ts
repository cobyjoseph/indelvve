import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

// THE STEPS FOR LOADING DATA

// LOAD DATA ----------------------------------------------------------
export const load: PageServerLoad = async () => {
	try {
		const post = await prisma.post.findMany({});
		const count = await prisma.post.count();


		return { post, count };
	} catch (error) {
		console.log(error);
	}
};

// when user gets page from server, this loads the data into the page itself, its not really an appi endpoint.

//---------------------------------------------------------------------

export const actions: Actions = {
	prismaAction: async ({ request }) => {
		const form = await request.formData();
		const content = form.get('contentInput');

		await prisma.post.create({
			data: {
				content: content,
				upvoted_number: 34
			}
		});
	}
};
