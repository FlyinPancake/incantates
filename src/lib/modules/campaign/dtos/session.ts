import type { RpgSession } from '@prisma/client';

export class SessionModel {
	constructor(
		public id: string | undefined,
		public name: string,
		public campaignId: string,
		public sessionNumber: number,
		public sessionTime: Date,
		public createdAt: Date | undefined,
		public updatedAt: Date | undefined,
	) {}

	public get rawData(): {
		id: string | undefined;
		name: string;
		campaignId: string;
		sessionNumber: number;
		sessionTime: Date;
		createdAt: Date | undefined;
		updatedAt: Date | undefined;
	} {
		return {
			id: this.id,
			name: this.name,
			campaignId: this.campaignId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			sessionNumber: this.sessionNumber,
			sessionTime: this.sessionTime,
		};
	}

	static fromDB(databaseModel: RpgSession) {
		return new SessionModel(
			databaseModel.id,
			databaseModel.name,
			databaseModel.campaignId,
			databaseModel.sessionNo,
			databaseModel.sessionAt,
			databaseModel.createdAt,
			databaseModel.updatedAt,
		);
	}
}
