import type { RpgCampaign } from '@prisma/client';
import type { CampaignModel } from '../models';

export interface CampaignRepositoryInterface {
	createCampaign(campaign: CampaignModel): Promise<RpgCampaign>;
	getCampainById(campaignId: string): Promise<RpgCampaign>;
	getCampaignsByOwnerId(ownerId: string): Promise<RpgCampaign[]>;
}
