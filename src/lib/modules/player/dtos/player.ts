import type { RpgPlayer } from '@prisma/client';

export class PlayerModel {
	constructor(
		public id: string | undefined,
		public name: string,
		public campaignId: string,
		public characterName: string,
		public createdAt: Date | undefined,
		public updatedAt: Date | undefined,
	) {}

	public get rawData(): {
		id: string | undefined;
		name: string;
		campaignId: string;
		characterName: string;
		createdAt: Date | undefined;
		updatedAt: Date | undefined;
	} {
		return {
			id: this.id,
			name: this.name,
			campaignId: this.campaignId,
			characterName: this.characterName,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	static fromDB(databaseModel: RpgPlayer) {
		return new PlayerModel(
			databaseModel.id,
			databaseModel.name,
			databaseModel.campaignId,
			databaseModel.characterName,
			databaseModel.createdAt,
			databaseModel.updatedAt,
		);
	}

	static create(name: string, characterName: string, campaignId: string) {
		return new PlayerModel(undefined, name, campaignId, characterName, undefined, undefined);
	}
}
