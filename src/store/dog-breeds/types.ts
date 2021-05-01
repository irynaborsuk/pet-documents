import { Breed } from '../../types';

export const GET_DOG_BREEDS = 'GET_DOG_BREEDS';
export const GET_DOG_BREEDS_SUCCESS = 'GET_DOG_BREEDS_SUCCESS';
export const GET_DOG_BREEDS_FAILURE = 'GET_DOG_BREEDS_FAILURE';

interface GetDogBreeds {
	type: typeof GET_DOG_BREEDS;
}

interface GetDogBreedsSuccess {
	type: typeof GET_DOG_BREEDS_SUCCESS;
	payload: Breed[]
}

interface GetDogBreedFailure {
	type: typeof GET_DOG_BREEDS_FAILURE;
	payload: string
}

export type DogBreedsActionTypes = GetDogBreeds | GetDogBreedsSuccess | GetDogBreedFailure;
