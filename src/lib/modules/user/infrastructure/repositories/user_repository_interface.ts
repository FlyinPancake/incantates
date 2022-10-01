import type { User } from '@prisma/client';

export interface UserRepositoryInterface {
	findByUsername(username: string): Promise<User | null>;
	getBySessionToken(sessionToken: string): Promise<User>;
	createUser(username: string, password: string): Promise<User>;
	updateAuthToken(id: string, token: string): Promise<User>;
}
