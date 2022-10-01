import type { User } from '@prisma/client';
import type { UserRepositoryInterface } from '../infrastructure/repositories/user_repository_interface';
import type { AuthTokenServiceInterface } from './auth_token_service_interface';

export class AuthTokenService implements AuthTokenServiceInterface {
	constructor(private readonly userRepository: UserRepositoryInterface) {}

	async createNewAuthToken(id: string): Promise<User> {
		const token = crypto.randomUUID();
		return await this.userRepository.updateAuthToken(id, token);
	}
}
