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
import { InitialPetData, PetDataResponse } from '../../types';

export function createPetPending(): PetActionType {
	return { type: CREATE_PET_PENDING }
}

export function createPetSucceeded(pet: InitialPetData): PetActionType {
	return {
		type: CREATE_PET_SUCCEEDED,
		payload: pet
	}
}

export function createPetFailed(error: string): PetActionType {
	return {
		type: CREATE_PET_FAILED,
		payload: error
	}
}

export function editPetPending(): PetActionType {
	return { type: EDIT_PET_PENDING }
}

export function editPetSucceeded(pet: InitialPetData): PetActionType {
	return {
		type: EDIT_PET_SUCCEEDED,
		payload: pet
	}
}

export function editPetFailed(error: string): PetActionType {
	return {
		type: EDIT_PET_FAILED,
		payload: error
	}
}

export function loadPet(): PetActionType {
	return { type: LOAD_PET }
}

export function loadPetSuccess(pet: PetDataResponse): PetActionType {
	return {
		type: LOAD_PET_SUCCESS,
		payload: pet
	}
}

export function loadPetFailure(error: string): PetActionType {
	return {
		type: LOAD_PET_FAILURE,
		payload: error
	}
}

export function resetPetStore(): PetActionType {
	return { type: RESET_PET_STORE }
}

export function deletePetPending(): PetActionType {
	return { type: DELETE_PET_PENDING }
}

export function deletePetSucceeded(): PetActionType {
	return { type: DELETE_PET_SUCCEEDED }
}

export function deletePetFailed(error: string): PetActionType {
	return {
		type: DELETE_PET_FAILED,
		payload: error
	}
}

