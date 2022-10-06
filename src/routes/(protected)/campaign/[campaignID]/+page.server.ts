import { getCampaignService, getUserService } from '$lib/services';
import { redirect, error } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

const userService = getUserService();
const campaignService = getCampaignService();

export const load: PageServerLoad = async ({ params, cookies }) => {
	const sessionCookie = cookies.get('session');
	if (!sessionCookie || sessionCookie === undefined) {
		throw redirect(302, '/');
	}
	const user = await userService.getBySessionToken(sessionCookie);

	const { campaignID } = params;
	const campaign = await campaignService.findCampaignById(campaignID);
	if (campaign === null) {
		throw error(404, { message: 'Campaign not found' });
	}
	if (campaign.ownerId !== user.id) {
		throw error(403, { message: 'Unauthorized' });
	}
	return {
		campaign: campaign.rawData,
	};
};
