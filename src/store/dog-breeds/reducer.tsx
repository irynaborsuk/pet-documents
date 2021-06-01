import { DogBreedsActionTypes, GET_DOG_BREEDS, GET_DOG_BREEDS_FAILURE, GET_DOG_BREEDS_SUCCESS } from './types';

const initialState = {
	isLoading: false,
	data: [],
	errorMessage: null,
}

export default function dogBreedsReducer(
	state = initialState,
	action: DogBreedsActionTypes
) {
	switch (action.type) {
		case GET_DOG_BREEDS:
			return {
				...state,
				isLoading: true,
				data: [],
				errorMessage: '',
			}
		case GET_DOG_BREEDS_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload, // because payload for success action will get the Breed[] (the whole data)
				errorMessage: null
			}
		case GET_DOG_BREEDS_FAILURE:
			return {
				...state,
				isLoading: false,
				data: [],
				errorMessage: action.payload // action.payload will consist the string with the error message
			}
		default:
			return state
	}
}
