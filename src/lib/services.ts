import { UserService } from '$lib/modules/user/services/user_service';
import { db } from '$lib/database';
import { UserRepository } from '$lib/modules/user/infrastructure/repositories/user_repository';
import { PasswordService } from '$lib/modules/user/services/password_service';
import { AuthTokenService } from '$lib/modules/user/services/auth_token_service';
import type { UserServiceInterface } from '$lib/modules/user/services/user_service_interface';
import { CampaignService } from '$lib/modules/campaign/services/campaign_service';
import { CampaignRepository } from '$lib/modules/campaign/infrastructure/repositories/campaign_repository';
import { PlayerService } from '$lib/modules/player/services/playerService';
import { PlayerRepository } from '$lib/modules/player/infrastructure/repositories/player_repository';

export const getUserService = (): UserServiceInterface => {
	return new UserService(
		new UserRepository(db),
		new PasswordService(),
		new AuthTokenService(new UserRepository(db)),
	);
};

export const getCampaignService = () => {
	return new CampaignService(new CampaignRepository(db));
};

export const getPlayerService = () => {
	return new PlayerService(new PlayerRepository(db));
};
