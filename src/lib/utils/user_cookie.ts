import { type Cookies, redirect } from '@sveltejs/kit';

/**
 * Returns valid user cookie or redirects to login page
 * @param cookies cookies from the request
 * @returns cookie value
 */
export const getUserCookie = (cookies: Cookies) => {
	const sessionCookie = cookies.get('session');
	if (!sessionCookie || sessionCookie === undefined) {
		throw redirect(302, '/');
	}
	return sessionCookie;
};
