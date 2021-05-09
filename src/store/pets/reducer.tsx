import { LOAD_PETS, LOAD_PETS_FAILURE, LOAD_PETS_SUCCESS, PetsActionType } from './types';

const initialState = {
	isLoading: false,
	data: [],
	errorMessage: null,
}

export default function petsReducer(
	state = initialState,
	action: PetsActionType
) {
	switch (action.type) {
		case LOAD_PETS:
			return {
				...state,
				isLoading: true,
				data: [],
				errorMessage: '',
			}
		case LOAD_PETS_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				errorMessage: null,
			}
		case LOAD_PETS_FAILURE:
			return {
				...state,
				isLoading: false,
				data: [],
				errorMessage: action.payload
			}
		default:
			return state
	}
}
