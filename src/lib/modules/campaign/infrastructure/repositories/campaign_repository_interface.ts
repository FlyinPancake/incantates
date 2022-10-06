import type { RpgCampaign } from '@prisma/client';
import type { CampaignModel } from '../models';

export interface CampaignRepositoryInterface {
	createCampaign(campaign: CampaignModel): Promise<RpgCampaign>;
	getCampaignById(campaignId: string): Promise<RpgCampaign>;
	findCampaignById(campaignId: string): Promise<RpgCampaign | null>;
	getCampaignsByOwnerId(ownerId: string): Promise<RpgCampaign[]>;
}
