import {
	CREATE_PET_FAILED,
	CREATE_PET_PENDING,
	CREATE_PET_SUCCEEDED,
	DELETE_PET_FAILED,
	DELETE_PET_PENDING,
	DELETE_PET_SUCCEEDED,
	EDIT_PET_FAILED,
	EDIT_PET_PENDING,
	EDIT_PET_SUCCEEDED,
	LOAD_PET,
	LOAD_PET_FAILURE,
	LOAD_PET_SUCCESS,
	PetActionType,
	RESET_PET_STORE
} from './types';
import { AppState, PetDataResponse } from '../../types';

const initialData: AppState<PetDataResponse | null> = {
	isLoading: false,
	data: null,
	errorMessage: '',
}

const initialState = {
	initialData,
	isDeleting: false
}

export default function petReducer(
	state = initialState,
	action: PetActionType
) {
	switch (action.type) {
		case CREATE_PET_PENDING:
			return {
				...state,
				isLoading: true,
				data: null,
				errorMessage: ''
			}
		case CREATE_PET_SUCCEEDED:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				errorMessage: ''
			}
		case CREATE_PET_FAILED:
			return {
				...state,
				isLoading: false,
				data: null,
				errorMessage: action.payload
			}
		case EDIT_PET_PENDING:
			return {
				...state,
				isLoading: true,
				data: null,
				errorMessage: ''
			}
		case EDIT_PET_SUCCEEDED:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				errorMessage: ''
			}
		case EDIT_PET_FAILED:
			return {
				...state,
				isLoading: false,
				data: null,
				errorMessage: action.payload
			}
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
		case DELETE_PET_PENDING:
			return {
				...state,
				isDeleting: true,
			}
		case DELETE_PET_SUCCEEDED:
			return {
				...state,
				isDeleting: true,
			}
		case DELETE_PET_FAILED:
			return {
				...state,
				isDeleting: false,
			}
		default:
			return state
	}
}
