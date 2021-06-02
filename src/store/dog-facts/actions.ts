import { DogFactsActionTypes, LOAD_DOG_FACTS_FAILED, LOAD_DOG_FACTS_PENDING, LOAD_DOG_FACTS_SUCCESS } from './types';
import { FactsTypes } from '../../types';

export function loadDogFactsPending(): DogFactsActionTypes {
	return {
		type: LOAD_DOG_FACTS_PENDING
	}
}

export function loadDogFactsSuccess(dogFacts: FactsTypes[]): DogFactsActionTypes {
	return {
		type: LOAD_DOG_FACTS_SUCCESS,
		payload: dogFacts
	}
}

export function loadDogFactsFailed(error: string): DogFactsActionTypes {
	return {
		type: LOAD_DOG_FACTS_FAILED,
		payload: error
	}
}
