import {
	ADD_AN_OWNER_FAILED,
	ADD_AN_OWNER_PENDING,
	ADD_AN_OWNER_SUCCEEDED,
	OwnerActionTypes,
	REMOVE_AN_OWNER_FAILED,
	REMOVE_AN_OWNER_PENDING,
	REMOVE_AN_OWNER_SUCCEEDED
} from './types';

const initialState = {
	isAddingAnOwner: false,
	isRemovingAnOwner: false,
}

// TODO: make connections to the buttons
// TODO: add effects
// TODO: make copy of this version and clean one of them for gitHub
// TODO: make as much work for gitHub as I can during this weekend

export default function ownerReducer(
	state = initialState,
	action: OwnerActionTypes
) {
	switch (action.type) {
		case ADD_AN_OWNER_PENDING:
			return {
				...state, isAddingAnOwner: true
			}
		case ADD_AN_OWNER_SUCCEEDED:
			return {
				...state, isAddingAnOwner: true
			}
		case ADD_AN_OWNER_FAILED:
			return {
				...state, isAddingAnOwner: false
			}
		case REMOVE_AN_OWNER_PENDING:
			return {
				...state, isRemovingAnOwner: true
			}
		case REMOVE_AN_OWNER_SUCCEEDED:
			return {
				...state, isRemovingAnOwner: true
			}
		case REMOVE_AN_OWNER_FAILED:
			return {
				...state, isRemovingAnOwner: false
			}
		default:
			return state
	}
}
