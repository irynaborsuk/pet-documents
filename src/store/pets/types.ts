import { PetsResponse } from '../../types';

export const LOAD_PETS = 'LOAD_PETS';
export const LOAD_PETS_SUCCESS = 'LOAD_PETS_SUCCESS';
export const LOAD_PETS_FAILURE = 'LOAD_PETS_FAILURE';
export const RESET_PETS_STORE = 'RESET_PETS_STORE';

interface LoadPets {
	type: typeof LOAD_PETS;
}

interface LoadPetsSuccess {
	type: typeof LOAD_PETS_SUCCESS;
	payload: PetsResponse[]
}

interface LoadPetsFailure {
	type: typeof LOAD_PETS_FAILURE;
	payload: string
}

interface ResetPetsStore {
	type: typeof RESET_PETS_STORE;
}

export type PetsActionType = LoadPets | LoadPetsSuccess | LoadPetsFailure | ResetPetsStore;
