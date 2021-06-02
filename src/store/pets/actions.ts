import { LOAD_PETS_PENDING, LOAD_PETS_FAILURE, LOAD_PETS_SUCCESS, PetsActionType, RESET_PETS_STORE } from './types';
import { PetsResponse } from '../../types';

export function loadPetsPending(): PetsActionType {
	return {
		type: LOAD_PETS_PENDING,
	}
}

export function loadPetsSuccess(pets: PetsResponse[]): PetsActionType {
	return {
		type: LOAD_PETS_SUCCESS,
		payload: pets,
	}
}

export function loadPetsFailure(errorMessage: string): PetsActionType {
	return {
		type: LOAD_PETS_FAILURE,
		payload: errorMessage,
	}
}

export function resetPetsStore(): PetsActionType {
	return {
		type: RESET_PETS_STORE
	}
}
