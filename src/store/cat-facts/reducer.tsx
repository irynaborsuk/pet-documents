import { CatFactsActionTypes, LOAD_CAT_FACTS_FAILED, LOAD_CAT_FACTS_PENDING, LOAD_CAT_FACTS_SUCCESS } from './types';

const initialState = {
	isLoading: false,
	data: [],
	errorMessage: '',
}

export default function catFactsReducer(
	state = initialState,
	action: CatFactsActionTypes
) {
	switch (action.type) {
		case LOAD_CAT_FACTS_PENDING:
			return {
				...state,
				isLoading: true, data: [], errorMessage: ''
			}
		case LOAD_CAT_FACTS_SUCCESS:
			return {
				...state,
				isLoading: false, data: action.payload, errorMessage: null
			}
		case LOAD_CAT_FACTS_FAILED:
			return {
				...state,
				isLoading: false, data: [], errorMessage: action.payload
			}
		default:
			return state
	}
}
