import { getUserService } from '$lib/services';
import type { Action, Actions, PageServerLoad } from './$types';
import { invalid, redirect } from '@sveltejs/kit';
import { UsernameAlreadyExistsError } from '$lib/modules/user/presentation/errors';

const userService = getUserService();

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
};

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string') {
		return {
			status: 400,
			body: 'Invalid request',
		};
	}
	try {
		await userService.register(username, password);
		throw redirect(302, '/login');
	} catch (error) {
		if (error instanceof UsernameAlreadyExistsError) {
			return invalid(400, {
				user: true,
			});
		}
	}
};

export const actions: Actions = { register };
