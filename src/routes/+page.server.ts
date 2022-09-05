import type { RequestHandler } from '@sveltejs/kit';
import { getHeapCodeStatistics } from 'v8';
import { prisma } from '../utils/prisma';
import type { PageServerLoad } from './$types';

// export const data = async () => {
// 	const data = await prisma.post.findFirst({
// 		where: {
// 			id: 1
// 		}
// 	});
// 	return {
// 		body: { data }
// 	};
// };

export const load: PageServerLoad = async () => {
	const post = await prisma.post.findFirst({
		where: {
			upvoted_number: 40
		}
	});
	return { post };
};
