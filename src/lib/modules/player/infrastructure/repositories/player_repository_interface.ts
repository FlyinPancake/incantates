import type { PlayerModel } from '../../dtos/player';

export interface PlayerRepositoryInterface {
	createPlayer(player: PlayerModel): Promise<PlayerModel>;
	getPlayerById(playerId: string): Promise<PlayerModel>;
	getPlayersByCampaignId(campaignId: string): Promise<PlayerModel[]>;
	removePlayer(playerId: string): Promise<void>;
}
