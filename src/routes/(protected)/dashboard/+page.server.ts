import { json, redirect, invalid } from '@sveltejs/kit';
import type { PageServerLoad, Action, Actions } from './$types';

import { getUserService, getCampaignService } from '$lib/services';
import { CampaignModel } from '$lib/modules/campaign/infrastructure/models';

const userService = getUserService();
const campaignService = getCampaignService();

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}
	const user = await userService.findByUsername(locals.user.username);
	const campaigns = await campaignService.getCampaignsByOwnerId(user.id);
	const mapped = campaigns.map((campaign) => ({ name: campaign.name, id: campaign.id }));
	return {
		data: {
			campaigns: mapped,
			user,
		},
	};
};

const createCampaign: Action = async ({ request, cookies }) => {
	const sessionCookie = cookies.get('session');
	if (!sessionCookie || sessionCookie === undefined) {
		throw redirect(302, '/');
	}
	try {
		const user = await userService.getBySessionToken(sessionCookie);

		const data = await request.formData();
		const campaignName = data.get('name');
		const campaignDescription = data.get('description');

		if (
			!campaignName ||
			!campaignDescription ||
			typeof campaignName !== 'string' ||
			typeof campaignDescription !== 'string'
		) {
			return invalid(400, { message: 'Invalid request' });
		}

		// await campaignService.createCampaign(
		// 	CampaignModel.create(campaignName, campaignDescription, user.id),
		// );

		return json({ success: true });
	} catch (e) {
		return invalid(400, { message: 'Invalid request' });
	}
};

export const actions: Actions = {
	createCampaign,
};
