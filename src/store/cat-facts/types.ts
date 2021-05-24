import { FactsTypes } from '../../types';

export const LOAD_CAT_FACTS_PENDING = 'LOAD_CAT_FACTS_PENDING';
export const LOAD_CAT_FACTS_SUCCESS = 'LOAD_CAT_FACTS_SUCCESS';
export const LOAD_CAT_FACTS_FAILED = 'LOAD_CAT_FACTS_FAILED';

interface LoadCatFactsPending {
	type: typeof LOAD_CAT_FACTS_PENDING
}

interface LoadCatFactsSuccess {
	type: typeof LOAD_CAT_FACTS_SUCCESS,
	payload: FactsTypes[]
}

interface LoadCatFactsFailed {
	type: typeof LOAD_CAT_FACTS_FAILED,
	payload: string
}

export type CatFactsActionTypes = LoadCatFactsPending | LoadCatFactsSuccess | LoadCatFactsFailed;
