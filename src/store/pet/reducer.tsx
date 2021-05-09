import { LOAD_PET, LOAD_PET_FAILURE, LOAD_PET_SUCCESS, PetActionType } from './types';

const initialState = {
	isLoading: false,
	data: [],
	errorMessage: null
}

export default function petReducer(
	state = initialState,
	action: PetActionType
) {
	switch (action.type) {
		case LOAD_PET:
			return {
				...state,
				isLoading: true,
				data: [],
				error: ''
			}
		case LOAD_PET_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				error: null
			}
		case LOAD_PET_FAILURE:
			return {
				...state,
				isLoading: false,
				data: [],
				error: action.payload
			}
		default:
			return state
	}
}
