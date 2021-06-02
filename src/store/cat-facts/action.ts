import { CatFactsActionTypes, LOAD_CAT_FACTS_FAILED, LOAD_CAT_FACTS_PENDING, LOAD_CAT_FACTS_SUCCESS } from './types';
import { FactsTypes } from '../../types';

export function loadCatFactsPending(): CatFactsActionTypes {
	return {
		type: LOAD_CAT_FACTS_PENDING
	}
}

export function loadCatFactsSuccess(catFact: FactsTypes[]): CatFactsActionTypes {
	return {
		type: LOAD_CAT_FACTS_SUCCESS,
		payload: catFact
	}
}

export function loadCatFactsFailed(error: string): CatFactsActionTypes {
	return {
		type: LOAD_CAT_FACTS_FAILED,
		payload: error
	}
}
