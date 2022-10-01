import { UserService } from '$lib/modules/user/services/user_service';
import { db } from '$lib/database';
import { UserRepository } from '$lib/modules/user/infrastructure/repositories/user_repository';
import { PasswordService } from './modules/user/services/password_service';
import { AuthTokenService } from './modules/user/services/auth_token_service';
import type { UserServiceInterface } from '$lib/modules/user/services/user_service_interface';

export const getUserService = (): UserServiceInterface => {
	return new UserService(
		new UserRepository(db),
		new PasswordService(),
		new AuthTokenService(new UserRepository(db)),
	);
};
