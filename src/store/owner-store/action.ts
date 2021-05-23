import {
	ADD_AN_OWNER_FAILED,
	ADD_AN_OWNER_PENDING,
	ADD_AN_OWNER_SUCCEEDED,
	REMOVE_AN_OWNER_FAILED,
	REMOVE_AN_OWNER_PENDING,
	REMOVE_AN_OWNER_SUCCEEDED,
	OwnerActionTypes
} from './types';

export function addAnOwnerPending(): OwnerActionTypes {
	return {
		type: ADD_AN_OWNER_PENDING
	}
}

export function addAnOwnerSucceeded(): OwnerActionTypes {
	return {
		type: ADD_AN_OWNER_SUCCEEDED
	}
}

export function addAnOwnerFailed(error: string): OwnerActionTypes {
	return {
		type: ADD_AN_OWNER_FAILED,
		payload: error
	}
}

export function removeAnOwnerPending(): OwnerActionTypes {
	return {
		type: REMOVE_AN_OWNER_PENDING
	}
}

export function removeAnOwnerSucceeded(): OwnerActionTypes {
	return {
		type: REMOVE_AN_OWNER_SUCCEEDED
	}
}

export function removeAnOwnerFailed(error: string): OwnerActionTypes {
	return {
		type: REMOVE_AN_OWNER_FAILED,
		payload: error
	}
}
