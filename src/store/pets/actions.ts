import { LOAD_PETS, LOAD_PETS_FAILURE, LOAD_PETS_SUCCESS, PetsActionType } from './types';
import { PetDataResponse } from '../../types';

export function loadPets(): PetsActionType {
	return {
		type: LOAD_PETS,
	}
}

export function loadPetsSuccess(pets: PetDataResponse[]): PetsActionType {
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
