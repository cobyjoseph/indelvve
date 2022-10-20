import { invalid, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';

import prisma from '$lib/server/prisma';

enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

// this is the register function called below. Request is built in. Since typescript is working I can use cntrl + space and request is one of the options
const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');
	const email = data.get('email');
	const first_name = data.get('first_name');
	const last_name = data.get('last_name');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true });
	}

	const user = await prisma.user.findUnique({
		where: { username }
	});

	if (user) {
		return invalid(400, { user: true });
	}

	await prisma.user.create({
		data: {
			username,
			passwordHash: await bcrypt.hash(password, 10),
			userAuthToken: crypto.randomUUID(),
			role: Role.USER,
			email: email,
			first_name: first_name,
			last_name: last_name
		}
	});

	throw redirect(303, '/login');
};

// THIS below is just calling on a function called register, you could put the function within this { } if you want
export const actions: Actions = { register };
