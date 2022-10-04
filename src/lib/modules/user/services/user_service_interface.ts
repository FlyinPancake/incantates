import type { User } from '@prisma/client';

export interface UserServiceInterface {
	findByUsername(username: string): Promise<User>;
	getBySessionToken(sessionToken: string): Promise<User>;
	getById(id: string): Promise<User>;
	register(username: string, password: string): Promise<User>;
	login(username: string, password: string): Promise<User>;
}
