import { Dispatch } from 'redux';
import {
	addAnOwnerFailed,
	addAnOwnerPending,
	addAnOwnerSucceeded, removeAnOwnerFailed,
	removeAnOwnerPending,
	removeAnOwnerSucceeded
} from './action';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { IAddAnOwner, IRemoveAnOwnerId } from '../../types';
import { loadPetReduxThunk } from '../pet/effects';

export const addAnOwnerReduxThunk = (petId: string, addAnnOwnerData: IAddAnOwner) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(addAnOwnerPending());

		await authorizedAxios.patch(`/pet/${petId}/add-owner`, addAnnOwnerData).then(
			(response) => {
				dispatch(addAnOwnerSucceeded(response.data));
				dispatch(loadPetReduxThunk(petId));
			})
			.catch((error) => {
				dispatch(addAnOwnerFailed(error))
			})
	}
}

export const removeAnOwnerReduxThunk = (petId: string, removeAnOwnerId: IRemoveAnOwnerId) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(removeAnOwnerPending());

		await authorizedAxios.patch(`/pet/${petId}/remove-owner`, removeAnOwnerId)
			.then(() => {
				dispatch(removeAnOwnerSucceeded());
				dispatch(loadPetReduxThunk(petId));
			})
			.catch((error) => {
				dispatch(removeAnOwnerFailed(error))
			})
	}
}
