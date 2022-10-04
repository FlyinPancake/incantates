import { CampaignNotFoundError } from '$lib/modules/campaign/presentation/errors';
import { Prisma, type PrismaClient } from '@prisma/client';
import { PlayerNotFoundError } from '../../presentation/error';
import { PlayerModel } from '../models';
import type { PlayerRepositoryInterface } from './player_repository_interface';

export class PlayerRepository implements PlayerRepositoryInterface {
	constructor(private readonly prisma: PrismaClient) {}

	async createPlayer(player: PlayerModel): Promise<PlayerModel> {
		try {
			return PlayerModel.fromDB(
				await this.prisma.rpgPlayer.create({
					data: {
						name: player.name,
						characterName: player.characterName,
						campaignId: player.campaignId,
					},
				}),
			);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2003') {
					throw new CampaignNotFoundError(player.campaignId);
				}
			}
			throw error;
		}
	}
	async getPlayerById(playerId: string): Promise<PlayerModel> {
		const maybePlayer = await this.prisma.rpgPlayer.findUnique({ where: { id: playerId } });
		if (maybePlayer === null) {
			throw new PlayerNotFoundError(playerId);
		}
		return PlayerModel.fromDB(maybePlayer);
	}
	async getPlayersByCampaignId(campaignId: string): Promise<PlayerModel[]> {
		return await (
			await this.prisma.rpgPlayer.findMany({ where: { campaignId } })
		).map((player) => PlayerModel.fromDB(player));
	}
}
