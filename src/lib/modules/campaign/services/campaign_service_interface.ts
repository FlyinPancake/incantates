import type { CampaignModel } from '../dtos/campaign';

export interface CampaignServiceInterface {
	createCampaign(campaign: CampaignModel): Promise<CampaignModel>;
	getCampaignsByOwnerId(ownerId: string): Promise<CampaignModel[]>;
	getCampaignById(campaignId: string): Promise<CampaignModel>;
	findCampaignById(campaignId: string): Promise<CampaignModel | null>;
	findByIdAndOwnerId(campaignId: string, ownerId: string): Promise<CampaignModel | null>;
}
