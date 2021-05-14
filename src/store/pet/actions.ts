import {
	LOAD_PET,
	LOAD_PET_FAILURE,
	LOAD_PET_SUCCESS,
	PetActionType
} from './types';
import { PetDataResponse } from '../../types';

export function loadPet(): PetActionType {
	return {
		type: LOAD_PET
	}
}

export function loadPetSuccess(pet: PetDataResponse): PetActionType {
	return {
		type: LOAD_PET_SUCCESS,
		payload: pet,
	}
}

export function loadPetFailure(error: string): PetActionType {
	return {
		type: LOAD_PET_FAILURE,
		payload: error
	}
}

