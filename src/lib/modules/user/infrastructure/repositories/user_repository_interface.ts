import type { User } from '@prisma/client';

export interface UserRepositoryInterface {
	findByUsername(username: string): Promise<User | null>;
	getById(id: string): Promise<User>;
	getBySessionToken(sessionToken: string): Promise<User>;
	createUser(username: string, password: string): Promise<User>;
	updateAuthToken(id: string, token: string): Promise<User>;
}
