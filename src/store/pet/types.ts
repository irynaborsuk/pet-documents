import { PetDataResponse } from '../../types';

export const LOAD_PET = 'LOAD_PET';
export const LOAD_PET_SUCCESS = 'LOAD_PET_SUCCESS';
export const LOAD_PET_FAILURE = 'LOAD_PET_FAILURE';
export const RESET_PET_STORE = 'RESET_PET_STORE';

interface LoadPet {
	type: typeof LOAD_PET;
}

interface LoadPetSuccess {
	type: typeof LOAD_PET_SUCCESS,
	payload: PetDataResponse,
}

interface LoadPetFailure {
	type: typeof LOAD_PET_FAILURE,
	payload: string
}

interface ResetPetStore {
	type: typeof RESET_PET_STORE;
}

export type PetActionType = LoadPet | LoadPetSuccess | LoadPetFailure | ResetPetStore;
