import type { UserServiceInterface } from '$lib/modules/user/services/user_service_interface';
import type { RpgCampaign } from '@prisma/client';

export class CampaignModel {
	constructor(
		public id: string | undefined,
		public name: string,
		public description: string,
		public ownerId: string,
		public createdAt: Date | undefined,
		public updatedAt: Date | undefined,
	) {}

	getOwner(ownerService: UserServiceInterface): Promise<{ username: string; id: string }> {
		return ownerService.getById(this.ownerId);
	}

	static create(name: string, description: string, ownerId: string) {
		return new CampaignModel(undefined, name, description, ownerId, undefined, undefined);
	}

	static fromDB(databaseModel: RpgCampaign) {
		return new CampaignModel(
			databaseModel.id,
			databaseModel.name,
			databaseModel.description,
			databaseModel.ownerId,
			databaseModel.createdAt,
			databaseModel.updatedAt,
		);
	}
}
