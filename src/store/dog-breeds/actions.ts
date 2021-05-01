import { DogBreedsActionTypes, GET_DOG_BREEDS, GET_DOG_BREEDS_FAILURE, GET_DOG_BREEDS_SUCCESS } from './types';
import { Breed } from '../../types';

// send the request
export function getDogBreeds(): DogBreedsActionTypes {
	return {
		type: GET_DOG_BREEDS,
	}
}

export function getDogBreedsSuccess(breeds: Breed[]): DogBreedsActionTypes {
	return {
		type: GET_DOG_BREEDS_SUCCESS,
		payload: breeds,
	}
}

export function getDogBreedFailure(error: string): DogBreedsActionTypes {
	return {
		type: GET_DOG_BREEDS_FAILURE,
		payload: error
	}
}
