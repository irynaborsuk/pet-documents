export const DELETE_PET_PENDING = 'DELETE_PET_PENDING';
export const DELETE_PET_SUCCEEDED = 'DELETE_PET_SUCCEEDED';
export const DELETE_PET_FAILED = 'DELETE_PET_FAILED';

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

export type PetDeleteActionType = DeletePetPending | DeletePetSucceeded | DeletePetFailed;
