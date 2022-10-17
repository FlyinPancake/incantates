import type { PlayerModel } from '../dtos/player';

export interface PlayerServiceInterface {
	get(playerId: string): Promise<PlayerModel>;
	create(player: PlayerModel): Promise<PlayerModel>;
	remove(playerId: string): Promise<void>;
}
