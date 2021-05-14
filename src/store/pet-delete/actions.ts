import { DELETE_PET_FAILED, DELETE_PET_PENDING, DELETE_PET_SUCCEEDED, PetDeleteActionType } from '../pet-delete/types';

export function deletePetPending(): PetDeleteActionType {
	return {
		type: DELETE_PET_PENDING
	}
}

export function deletePetSucceeded(): PetDeleteActionType {
	return {
		type: DELETE_PET_SUCCEEDED,
	}
}

export function deletePetFailed(error: string): PetDeleteActionType {
	return {
		type: DELETE_PET_FAILED,
		payload: error
	}
}
