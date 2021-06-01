import { PetsResponse } from '../../types';

export const LOAD_PETS_PENDING = 'LOAD_PETS_PENDING';
export const LOAD_PETS_SUCCESS = 'LOAD_PETS_SUCCESS';
export const LOAD_PETS_FAILURE = 'LOAD_PETS_FAILURE';
export const RESET_PETS_STORE = 'RESET_PETS_STORE';

interface LoadPetsPending {
	type: typeof LOAD_PETS_PENDING;
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

export type PetsActionType = LoadPetsPending | LoadPetsSuccess | LoadPetsFailure | ResetPetsStore;
