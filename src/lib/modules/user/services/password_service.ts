import bcrypt from 'bcrypt';

import type { PasswordServiceInterface } from './password_service_interface';

export class PasswordService implements PasswordServiceInterface {
	hashPassword(password: string) {
		return bcrypt.hash(password, 10);
	}

	async comparePasswords(password: string, hashedPassword: string) {
		return await bcrypt.compare(password, hashedPassword);
	}
}
