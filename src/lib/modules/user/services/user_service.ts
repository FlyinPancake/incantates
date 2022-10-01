import { type User, Prisma } from '@prisma/client';

import type { UserRepositoryInterface } from '../infrastructure/repositories/user_repository_interface';
import {
	UsernameAlreadyExistsError,
	UsernameEmptyError,
	UsernameError,
	PasswordEmptyError,
	PasswordError,
	UserCredentialsError,
} from '../presentation/errors';
import type { PasswordServiceInterface } from './password_service_interface';
import type { UserServiceInterface } from './user_service_interface';
import type { AuthTokenServiceInterface } from './auth_token_service_interface';

export class UserService implements UserServiceInterface {
	constructor(
		private readonly userRepository: UserRepositoryInterface,
		private readonly passwordService: PasswordServiceInterface,
		private readonly authTokenService: AuthTokenServiceInterface,
	) {}

	async findByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findByUsername(username);
		if (user != null) {
			return user;
		} else {
			throw new UsernameError();
		}
	}

	async register(username: string, password: string): Promise<User> {
		if (await this.userRepository.findByUsername(username)) {
			throw new UsernameAlreadyExistsError();
		}
		if (username.length === 0) {
			throw new UsernameEmptyError();
		}
		if (password.length === 0) {
			throw new PasswordEmptyError();
		}

		return await this.userRepository.createUser(username, password);
	}

	async login(username: string, password: string): Promise<User> {
		const user = await this.findByUsername(username);

		if (await this.passwordService.comparePasswords(password, user.passwordHash)) {
			throw new PasswordError();
		}
		return await this.authTokenService.createNewAuthToken(user.id);
	}

	async getBySessionToken(sessionToken: string): Promise<User> {
		try {
			return await this.userRepository.getBySessionToken(sessionToken);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.log('error.code', error.code);
				if (error.code === 'P2025') {
					throw new UserCredentialsError();
				}
			} else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
				console.log('error.message', error.message);
			}

			throw error;
		}
	}
}
