import { IncantatesError } from '$lib/modules/common/presentation/errors';

export class UserCredentialsError extends IncantatesError {
	constructor() {
		super('UserCredentialsError');
	}
}

export class UsernameEmptyError extends UserCredentialsError {
	constructor() {
		super();
	}
}

export class UsernameError extends UserCredentialsError {
	constructor() {
		super();
	}
}

export class PasswordError extends UserCredentialsError {
	constructor() {
		super();
	}
}

export class PasswordEmptyError extends UserCredentialsError {
	constructor() {
		super();
	}
}

export class UsernameAlreadyExistsError extends UserCredentialsError {
	constructor() {
		super();
	}
}
