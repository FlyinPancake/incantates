import type { Handle } from '@sveltejs/kit';

import { getUserService } from '$lib/services';
import { UserCredentialsError } from '$lib/modules/user/presentation/errors';

const userService = getUserService();

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session');
	if (!sessionToken) {
		return await resolve(event);
	}
	try {
		const user = await userService.getBySessionToken(sessionToken);

		event.locals.user = {
			username: user.username,
		};
		return await resolve(event);
	} catch (e) {
		if (e instanceof UserCredentialsError) {
			console.log(e);
		}
	}
	return await resolve(event);
};
