import type { PlayerModel } from '../models';

export interface PlayerRepositoryInterface {
	createPlayer(player: PlayerModel): Promise<PlayerModel>;
	getPlayerById(playerId: string): Promise<PlayerModel>;
	getPlayersByCampaignId(campaignId: string): Promise<PlayerModel[]>;
}
