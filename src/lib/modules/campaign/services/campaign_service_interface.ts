import type { CampaignModel } from '../infrastructure/models';

export interface CampaignServiceInterface {
	createCampaign(campaign: CampaignModel): Promise<CampaignModel>;
	getCampaignsByOwnerId(ownerId: string): Promise<CampaignModel[]>;
	getCampaignById(campaignId: string): Promise<CampaignModel>;
	findCampaignById(campaignId: string): Promise<CampaignModel | null>;
}
