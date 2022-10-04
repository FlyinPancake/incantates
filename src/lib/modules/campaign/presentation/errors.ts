import { IncantatesError } from '$lib/modules/common/presentation/errors';

export class CampaignError extends IncantatesError {
	constructor(message = 'CampaignError') {
		super(message);
	}
}

export class CampaignNotFoundError extends CampaignError {
	constructor(id: string) {
		super(`Campaign not found by id: ${id}`);
	}
}
