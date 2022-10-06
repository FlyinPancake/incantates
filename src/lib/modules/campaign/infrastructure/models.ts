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

	public get rawData(): {
		id: string | undefined;
		name: string;
		description: string;
		ownerId: string;
		createdAt: Date | undefined;
		updatedAt: Date | undefined;
	} {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			ownerId: this.ownerId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
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
