import { invalid, redirect } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import type { Action, Actions, PageServerLoad } from './$types';

import { prisma } from '../../../utils/prisma';
import path from 'path';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true });
	}

	const user = await prisma.user.findUnique({
		where: { username }
	});

	if (!user) {
		return invalid(400, { credentials: true });
	}

	const userPassword = await bcrypt.compare(password, user.passwordHash);

	if (!userPassword) {
		return invalid(400, { credentials: true });
	}

	const authenticatedUser = await prisma.user.update({
		where: { username: user.username },
		data: { userAuthToken: crypto.randomUUID() }
	});

	cookies.set('session', authenticatedUser.userAuthToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/');
};

export const actions: Actions = { login };