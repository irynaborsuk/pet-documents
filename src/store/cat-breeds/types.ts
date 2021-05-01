import { Breed } from '../../types';

export const LOAD_CAT_BREEDS = 'LOAD_CAT_BREEDS';
export const LOAD_CAT_BREEDS_SUCCESSFUL = 'LOAD_CAT_BREEDS_SUCCESSFUL';
export const LOAD_CAT_BREEDS_FAILURE = 'LOAD_CAT_BREEDS_FAILURE '

export interface LoadCatBreeds {
	type: typeof LOAD_CAT_BREEDS,
}

export interface LoadCatBreedsSuccessful {
	type: typeof LOAD_CAT_BREEDS_SUCCESSFUL,
	payload: Breed[]
}
export interface LoadCatBreedsFailure {
	type: typeof LOAD_CAT_BREEDS_FAILURE,
	payload: string
}

export type CatBreedsActionTypes = LoadCatBreeds | LoadCatBreedsSuccessful | LoadCatBreedsFailure;
