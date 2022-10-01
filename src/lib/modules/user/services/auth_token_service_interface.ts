import type { User } from '@prisma/client';

export interface AuthTokenServiceInterface {
	createNewAuthToken(id: string): Promise<User>;
}
