import type { Handle } from '@sveltejs/kit';
import { prisma } from './utils/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await prisma.user.findUnique({
		where: { userAuthToken: session },
		select: { username: true, role: true }
	});

	if (user) {
		event.locals.user = {
			name: user.username,
            // Note that in the tutorial he uses role.name, but that's because he's not using ENUMs.
			role: user.role
		};
	}

	return await resolve(event);
};
