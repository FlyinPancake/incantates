import type { CampaignModel } from '$lib/modules/campaign/infrastructure/models';
import type { CampaignServiceInterface } from '$lib/modules/campaign/services/campaign_service_interface';
import type { RpgPlayer } from '@prisma/client';

export class PlayerModel {
	constructor(
		public id: string | undefined,
		public name: string,
		public characterName: string,
		public campaignId: string,
		public createdAt: Date | undefined,
		public updatedAt: Date | undefined,
	) {}

	async getCampaign(campaignService: CampaignServiceInterface): Promise<CampaignModel> {
		return await campaignService.getCampaignById(this.campaignId);
	}

	toDB(): RpgPlayer {
		if (!this.id || !this.createdAt || !this.updatedAt) {
			throw new Error('Cannot convert to database model');
		}

		return {
			id: this.id,
			name: this.name,
			characterName: this.characterName,
			campaignId: this.campaignId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	static fromDB(databaseModel: RpgPlayer) {
		return new PlayerModel(
			databaseModel.id,
			databaseModel.name,
			databaseModel.characterName,
			databaseModel.campaignId,
			databaseModel.createdAt,
			databaseModel.updatedAt,
		);
	}
}
