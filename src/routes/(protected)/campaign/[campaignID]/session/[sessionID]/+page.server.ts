import type { PageServerLoad } from './$types';
import { getUserCookie } from '$lib/utils/user_cookie';
import { getUserService, getCampaignService } from '$lib/services';

const userService = getUserService();
const campaignService = getCampaignService();

export const load: PageServerLoad = async ({ params, cookies }) => {
	const userCookie = getUserCookie(cookies);

	const user = await userService.getBySessionToken(userCookie);
	const { campaignID, sessionID } = params;

	return {
		data: {
			sessionID: 'sessionID',
		},
	};
};
