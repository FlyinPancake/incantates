import type { CampaignModel } from '../../dtos/campaign';
import type { RpgCampaignRelations } from '../types';

export interface CampaignRepositoryInterface {
	createCampaign(campaign: CampaignModel): Promise<RpgCampaignRelations>;
	getCampaignById(campaignId: string): Promise<RpgCampaignRelations>;
	findCampaignByIdAndRelations(campaignId: string): Promise<RpgCampaignRelations | null>;
	getCampaignsByOwnerId(ownerId: string): Promise<RpgCampaignRelations[]>;
}
