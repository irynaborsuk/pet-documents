import { PetDataResponse } from '../../types';

export const LOAD_PETS = 'LOAD_PETS';
export const LOAD_PETS_SUCCESS = 'LOAD_PETS_SUCCESS';
export const LOAD_PETS_FAILURE = 'LOAD_PETS_FAILURE';

interface LoadPets {
	type: typeof LOAD_PETS;
}

interface LoadPetsSuccess {
	type: typeof LOAD_PETS_SUCCESS;
	payload: PetDataResponse[]
}

interface LoadPetsFailure {
	type: typeof LOAD_PETS_FAILURE;
	payload: string
}

export type PetsActionType = LoadPets | LoadPetsSuccess | LoadPetsFailure;
