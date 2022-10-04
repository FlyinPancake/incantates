import type { UserRepositoryInterface } from './user_repository_interface';
import { type PrismaClient, Prisma, type User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserCredentialsError, UsernameAlreadyExistsError } from '../../presentation/errors';

export class UserRepository implements UserRepositoryInterface {
	constructor(private readonly db: PrismaClient) {}

	async findByUsername(username: string) {
		return await this.db.user.findUnique({
			where: {
				username,
			},
		});
	}

	async createUser(username: string, password: string) {
		try {
			return await this.db.user.create({
				data: {
					username,
					passwordHash: await bcrypt.hash(password, 10),
					userAuthToken: crypto.randomUUID(),
				},
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new UsernameAlreadyExistsError();
				}
			}
			throw error;
		}
	}

	async updateAuthToken(id: string, token: string): Promise<User> {
		const user = await this.db.user.update({
			where: {
				id,
			},
			data: {
				userAuthToken: token,
			},
		});
		return user;
	}

	async getBySessionToken(userAuthToken: string): Promise<User> {
		const user = await this.db.user.findUnique({
			where: {
				userAuthToken,
			},
		});
		if (!user) {
			throw new UserCredentialsError();
		}
		return user;
	}

	async getById(id: string): Promise<User> {
		return await this.db.user.findUniqueOrThrow({
			where: {
				id,
			},
		});
	}
}
