import { CampaignModel } from '../infrastructure/models';
import type { CampaignRepositoryInterface } from '$lib/modules/campaign/infrastructure/repositories/campaign_repository_interface';
import type { CampaignServiceInterface } from './campaign_service_interface';

export class CampaignService implements CampaignServiceInterface {
	constructor(private readonly campaignRepository: CampaignRepositoryInterface) {}
	async createCampaign(campaign: CampaignModel): Promise<CampaignModel> {
		return CampaignModel.fromDB(await this.campaignRepository.createCampaign(campaign));
	}
	async getCampaignsByOwnerId(ownerId: string): Promise<CampaignModel[]> {
		return (await this.campaignRepository.getCampaignsByOwnerId(ownerId)).map((campaign) =>
			CampaignModel.fromDB(campaign),
		);
	}
	async getCampaignById(campaignId: string): Promise<CampaignModel> {
		return CampaignModel.fromDB(await this.campaignRepository.getCampaignById(campaignId));
	}
	async findCampaignById(campaignId: string): Promise<CampaignModel | null> {
		const campaign = await this.campaignRepository.findCampaignById(campaignId);
		if (campaign) {
			return CampaignModel.fromDB(campaign);
		}
		return null;
	}
}
