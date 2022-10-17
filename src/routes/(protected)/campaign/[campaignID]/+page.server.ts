import { PlayerModel } from '$lib/modules/player/dtos/player';
import { getCampaignService, getUserService, getPlayerService } from '$lib/services';
import { getUserCookie } from '$lib/utils/user_cookie';
import { redirect, error, invalid } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

const userService = getUserService();
const campaignService = getCampaignService();
const playerService = getPlayerService();

export const load: PageServerLoad = async ({ params, cookies }) => {
	const sessionCookie = cookies.get('session');
	if (!sessionCookie || sessionCookie === undefined) {
		throw redirect(302, '/');
	}
	const user = await userService.getBySessionToken(sessionCookie);

	const { campaignID } = params;
	const campaign = await campaignService.findByIdAndOwnerId(campaignID, user.id);
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

const addPlayer: Action = async ({ request, params, cookies }) => {
	const { campaignID } = params;
	const userCookie = getUserCookie(cookies);

	if (!userCookie) {
		return error(401, { message: 'Unauthorized' });
	}

	const data = await request.formData();
	const playerName = data.get('name');
	const characterName = data.get('characterName');

	if (
		!playerName ||
		!characterName ||
		typeof playerName !== 'string' ||
		typeof characterName !== 'string'
	) {
		return invalid(400, { message: 'Invalid request' });
	}

	const playerModel = PlayerModel.create(playerName, characterName, campaignID);
	console.log(playerModel);
	await playerService.create(playerModel);

	throw redirect(302, `/campaign/${campaignID}`);
};

const removePlayer: Action = async ({ request, params, cookies }) => {
	getUserCookie(cookies);
	const { campaignID } = params;
	const data = await request.formData();
	const playerID = data.get('playerID');

	if (!playerID || typeof playerID !== 'string') {
		return invalid(400, { message: 'Invalid request' });
	}

	const player = await playerService.get(playerID);
	if (player.campaignId !== campaignID) {
		return error(403, { message: 'Unauthorized' });
	}

	await playerService.remove(playerID);

	throw redirect(302, `/campaign/${campaignID}`);
};

export const actions: Actions = {
	addPlayer,
	removePlayer,
};
