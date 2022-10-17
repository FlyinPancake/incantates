import type { CampaignRepositoryInterface } from './campaign_repository_interface';
import { Prisma, type PrismaClient, type RpgCampaign } from '@prisma/client';
import type { CampaignModel } from '../../dtos/campaign';
import { UserNotFoundError } from '$lib/modules/user/presentation/errors';
import type { RpgCampaignRelations } from '../types';

export class CampaignRepository implements CampaignRepositoryInterface {
	constructor(private readonly prisma: PrismaClient) {}

	async createCampaign(campaign: CampaignModel): Promise<RpgCampaign> {
		try {
			return await this.prisma.rpgCampaign.create({
				data: {
					name: campaign.name,
					description: campaign.description,
					ownerId: campaign.ownerId,
				},
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2003') {
					throw new UserNotFoundError();
				}
			}
			throw error;
		}
	}
	async getCampaignById(campaignId: string): Promise<RpgCampaign> {
		return await this.prisma.rpgCampaign.findUniqueOrThrow({
			where: {
				id: campaignId,
			},
		});
	}
	async getCampaignsByOwnerId(ownerId: string): Promise<RpgCampaign[]> {
		return await this.prisma.rpgCampaign.findMany({
			where: {
				ownerId,
			},
		});
	}

	async findCampaignByIdAndRelations(campaignId: string): Promise<RpgCampaignRelations | null> {
		return await this.prisma.rpgCampaign.findUnique({
			where: {
				id: campaignId,
			},
			include: {
				players: true,
				owner: true,
				sessions: true,
			},
		});
	}
}
