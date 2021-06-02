import { FactsTypes } from '../../types';

export const LOAD_DOG_FACTS_PENDING = 'LOAD_DOG_FACTS_PENDING';
export const LOAD_DOG_FACTS_SUCCESS = 'LOAD_DOG_FACTS_SUCCESS';
export const LOAD_DOG_FACTS_FAILED = 'LOAD_DOG_FACTS_FAILED';

interface LoadDogFactsPending {
	type: typeof LOAD_DOG_FACTS_PENDING
}

interface LoadDogFactsSuccess {
	type: typeof LOAD_DOG_FACTS_SUCCESS,
	payload: FactsTypes[]
}

interface LoadDogFactsFailed {
	type: typeof LOAD_DOG_FACTS_FAILED,
	payload: string
}
export type DogFactsActionTypes = LoadDogFactsPending | LoadDogFactsSuccess | LoadDogFactsFailed;
