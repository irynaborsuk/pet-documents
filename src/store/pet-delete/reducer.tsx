import {
	DELETE_PET_FAILED,
	DELETE_PET_PENDING,
	DELETE_PET_SUCCEEDED, PetDeleteActionType
} from './types';

const initialState = {
	isDeleting: false,
}

export default function petDeleteReducer(
	state = initialState,
	action: PetDeleteActionType
) {
	switch (action.type) {
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
