import { invalid, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

import { getUserService } from '$lib/services';
import { UserCredentialsError } from '$lib/modules/user/presentation/errors';

const userService = getUserService();

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
};

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string') {
		return invalid(400, { message: 'Invalid request' });
	}

	try {
		const user = await userService.login(username, password);
		cookies.set('session', user.userAuthToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7, // 1 week
		});
		throw redirect(302, `/dashboard`);
	} catch (e) {
		if (e instanceof UserCredentialsError) {
			return invalid(400, { credentials: true });
		} else {
			throw e;
		}
	}
};

export const actions: Actions = { login };
