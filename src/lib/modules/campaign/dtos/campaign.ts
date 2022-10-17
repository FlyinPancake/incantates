import { PlayerModel } from '$lib/modules/player/dtos';
import { SessionModel } from '.';
import type { RpgCampaignRelations } from '../infrastructure/types';

export class CampaignModel {
	constructor(
		public id: string | undefined,
		public name: string,
		public description: string,
		public ownerId: string,
		public createdAt: Date | undefined,
		public updatedAt: Date | undefined,

		public sessions: SessionModel[] = [],
		public players: PlayerModel[] = [],
	) {}

	public get rawData(): {
		id: string | undefined;
		name: string;
		description: string;
		ownerId: string;
		createdAt: Date | undefined;
		updatedAt: Date | undefined;

		sessions: {
			id: string | undefined;
			name: string;
			campaignId: string;
			sessionNumber: number;
			sessionTime: Date;
			createdAt: Date | undefined;
			updatedAt: Date | undefined;
		}[];

		players: {
			id: string | undefined;
			name: string;
			campaignId: string;
			characterName: string;
			createdAt: Date | undefined;
			updatedAt: Date | undefined;
		}[];
	} {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			ownerId: this.ownerId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			sessions: this.sessions.map((session) => session.rawData),
			players: this.players.map((player) => player.rawData),
		};
	}

	static create(name: string, description: string, ownerId: string) {
		return new CampaignModel(undefined, name, description, ownerId, undefined, undefined);
	}

	static fromDB(databaseModel: RpgCampaignRelations) {
		return new CampaignModel(
			databaseModel.id,
			databaseModel.name,
			databaseModel.description,
			databaseModel.ownerId,
			databaseModel.createdAt,
			databaseModel.updatedAt,
			databaseModel.sessions?.map((session) => SessionModel.fromDB(session)) ?? [],
			databaseModel.players?.map((player) => PlayerModel.fromDB(player)) ?? [],
		);
	}
}
