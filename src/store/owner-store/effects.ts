import { Dispatch } from 'redux';
import { addAnOwnerFailed, addAnOwnerPending, addAnOwnerSucceeded } from './action';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { IAddAnOwner } from '../../types';
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
