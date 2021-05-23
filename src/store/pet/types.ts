import { InitialPetData, PetDataResponse } from '../../types';

export const CREATE_PET_PENDING = 'CREATE_PET_PENDING';
export const CREATE_PET_SUCCEEDED = 'CREATE_PET_SUCCEEDED';
export const CREATE_PET_FAILED = 'CREATE_PET_FAILED';

export const EDIT_PET_PENDING = 'EDIT_PET_PENDING';
export const EDIT_PET_SUCCEEDED = 'EDIT_PET_SUCCEEDED';
export const EDIT_PET_FAILED = 'EDIT_PET_FAILED';

export const LOAD_PET = 'LOAD_PET';
export const LOAD_PET_SUCCESS = 'LOAD_PET_SUCCESS';
export const LOAD_PET_FAILURE = 'LOAD_PET_FAILURE';
export const RESET_PET_STORE = 'RESET_PET_STORE';

export const DELETE_PET_PENDING = 'DELETE_PET_PENDING';
export const DELETE_PET_SUCCEEDED = 'DELETE_PET_SUCCEEDED';
export const DELETE_PET_FAILED = 'DELETE_PET_FAILED';

interface CreatePetPending {
	type: typeof CREATE_PET_PENDING
}

interface CreatePetSucceeded {
	type: typeof CREATE_PET_SUCCEEDED,
	payload: InitialPetData
}

interface CreatePetFailed {
	type: typeof CREATE_PET_FAILED,
	payload: string
}

interface EditPetPending {
	type: typeof EDIT_PET_PENDING
}

interface EditPetSucceeded {
	type: typeof EDIT_PET_SUCCEEDED,
	payload: InitialPetData
}

interface EditPetFailed {
	type: typeof EDIT_PET_FAILED,
	payload: string
}

interface LoadPet {
	type: typeof LOAD_PET;
}

interface LoadPetSuccess {
	type: typeof LOAD_PET_SUCCESS,
	payload: PetDataResponse,
}

interface LoadPetFailure {
	type: typeof LOAD_PET_FAILURE,
	payload: string
}

interface ResetPetStore {
	type: typeof RESET_PET_STORE;
}

interface DeletePetPending {
	type: typeof DELETE_PET_PENDING
}

interface DeletePetSucceeded {
	type: typeof DELETE_PET_SUCCEEDED,
}

interface DeletePetFailed {
	type: typeof DELETE_PET_FAILED,
	payload: string
}

export type PetActionType =
	CreatePetPending
	| CreatePetSucceeded
	| CreatePetFailed
	| EditPetPending
	| EditPetSucceeded
	| EditPetFailed
	| LoadPet
	| LoadPetSuccess
	| LoadPetFailure
	| ResetPetStore
	| DeletePetPending
	| DeletePetSucceeded
	| DeletePetFailed;
