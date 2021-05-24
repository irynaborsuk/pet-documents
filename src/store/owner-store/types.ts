import { IAddAnOwner } from '../../types';

export const ADD_AN_OWNER_PENDING = 'ADD_AN_OWNER_PENDING';
export const ADD_AN_OWNER_SUCCEEDED = 'ADD_AN_OWNER_SUCCEEDED';
export const ADD_AN_OWNER_FAILED = 'ADD_AN_OWNER_FAILED';

export const REMOVE_AN_OWNER_PENDING = 'REMOVE_AN_OWNER_PENDING';
export const REMOVE_AN_OWNER_SUCCEEDED = 'REMOVE_AN_OWNER_SUCCEEDED';
export const REMOVE_AN_OWNER_FAILED = 'REMOVE_AN_OWNER_FAILED';

interface AddAnOwnerPending {
	type: typeof ADD_AN_OWNER_PENDING
}

interface AddAnOwnerSucceeded {
	type: typeof ADD_AN_OWNER_SUCCEEDED
	payload: IAddAnOwner
}

interface AddAnOwnerFailed {
	type: typeof ADD_AN_OWNER_FAILED,
	payload: string
}

interface RemoveAnOwnerPending {
	type: typeof REMOVE_AN_OWNER_PENDING
}

interface RemoveAnOwnerSucceeded {
	type: typeof REMOVE_AN_OWNER_SUCCEEDED
}

interface RemoveAnOwnerFailed {
	type: typeof REMOVE_AN_OWNER_FAILED,
	payload: string
}

export type OwnerActionTypes =
	AddAnOwnerPending
	| AddAnOwnerSucceeded
	| AddAnOwnerFailed
	| RemoveAnOwnerPending
	| RemoveAnOwnerSucceeded
	| RemoveAnOwnerFailed;
