import type { RequestHandler } from '@sveltejs/kit';
import { getHeapCodeStatistics } from 'v8';
import { prisma } from '../utils/prisma';

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

export const load = async () => {
	const data = await prisma.post.findFirst({
		where: {
			id: 1
		}
	});
	return { data };
};
