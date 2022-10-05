import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getCampaignService } from '$lib/services';

const campaignService = getCampaignService();

export const POST: RequestHandler = async ({ request }) => {
	const { data } = await await request.json();

	const campaign = await campaignService.createCampaign(data);

	return json(campaign, {
		status: 201,
	});
};
