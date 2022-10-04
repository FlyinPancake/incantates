import { IncantatesError } from '$lib/modules/common/presentation/errors';

export class UserError extends IncantatesError {
	constructor(message = 'UserError') {
		super(message);
	}
}
export class UserCredentialsError extends UserError {
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

export class UserNotFoundError extends UserError {
	constructor() {
		super('UserNotFoundError');
	}
}
