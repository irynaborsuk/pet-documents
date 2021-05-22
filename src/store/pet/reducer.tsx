import {
	LOAD_PET,
	LOAD_PET_FAILURE,
	LOAD_PET_SUCCESS,
	PetActionType, RESET_PET_STORE
} from './types';
import { AppState, PetDataResponse } from '../../types';

const initialState: AppState<PetDataResponse | null> = {
	isLoading: false,
	data: null,
	errorMessage: '',
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
				data: null,
				errorMessage: ''
			}
		case LOAD_PET_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				errorMessage: null
			}
		case LOAD_PET_FAILURE:
			return {
				...state,
				isLoading: false,
				data:  null,
				errorMessage: action.payload
			}
		case RESET_PET_STORE:
			return {
				...state,
				isLoading: false,
				data:  null,
			}
		default:
			return state
	}
}
