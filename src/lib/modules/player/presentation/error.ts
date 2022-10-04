import { IncantatesError } from '$lib/modules/common/presentation/errors';

export class PlayerError extends IncantatesError {
	constructor(message = 'PlayerError') {
		super(message);
	}
}

export class PlayerNotFoundError extends PlayerError {
	constructor(id: string) {
		super(`Player not found by id: ${id}`);
	}
}
