import {
	CatBreedsActionTypes,
	LOAD_CAT_BREEDS,
	LOAD_CAT_BREEDS_FAILURE,
	LOAD_CAT_BREEDS_SUCCESSFUL,
} from './types';
import { Breed } from '../../types';

export function loadCatBreeds(): CatBreedsActionTypes {
	return {
		type: LOAD_CAT_BREEDS
	}
}
export function loadCatBreedsSuccessful(payload: Breed[]): CatBreedsActionTypes {
	return {
		type: LOAD_CAT_BREEDS_SUCCESSFUL,
		payload,
	}
}
export function loadCatBreedsFailure(payload: string): CatBreedsActionTypes {
	return {
		type: LOAD_CAT_BREEDS_FAILURE,
		payload,
	}
}
