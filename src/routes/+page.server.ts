import type { RequestHandler } from '@sveltejs/kit';
import type { PostType } from 'src/types/types';
import { getHeapCodeStatistics } from 'v8';
import { prisma } from '../utils/prisma';
import type { Action, PageServerLoad } from './$types';

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
	const post = await prisma.post.findMany({});
	return { post };
};

export const actions: Action = {
	default: async function funcToAccessAction() {}
};
