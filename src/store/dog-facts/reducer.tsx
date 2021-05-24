import { DogFactsActionTypes, LOAD_DOG_FACTS_FAILED, LOAD_DOG_FACTS_PENDING, LOAD_DOG_FACTS_SUCCESS } from './types';

const initialState = {
	isLoading: false,
	data: [],
	errorMessage: '',
}

export default function dogFactsReducer(
	state = initialState,
	action: DogFactsActionTypes
) {
	switch (action.type) {
		case LOAD_DOG_FACTS_PENDING:
			return {
				...state,
				isLoading: true, data: [], errorMessage: ''
			}
		case LOAD_DOG_FACTS_SUCCESS:
			return {
				...state,
				isLoading: false, data: action.payload, errorMessage: null
			}
		case LOAD_DOG_FACTS_FAILED:
			return {
				...state,
				isLoading: false, data: [], errorMessage: action.payload
			}
		default:
			return state
	}
}
