import type { PlayerModel } from '../dtos/player';
import type { PlayerRepositoryInterface } from '../infrastructure/repositories/player_repository_interface';
import type { PlayerServiceInterface } from './playerServiceInterface';

export class PlayerService implements PlayerServiceInterface {
	constructor(private readonly playerRepository: PlayerRepositoryInterface) {}
	async remove(playerId: string): Promise<void> {
		return await this.playerRepository.removePlayer(playerId);
	}

	async get(playerId: string): Promise<PlayerModel> {
		return await this.playerRepository.getPlayerById(playerId);
	}
	create(player: PlayerModel): Promise<PlayerModel> {
		return this.playerRepository.createPlayer(player);
	}
}
