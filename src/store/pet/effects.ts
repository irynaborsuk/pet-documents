import { Dispatch } from 'react';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { loadPet, loadPetFailure, loadPetSuccess } from './actions';

export const loadPetReduxThunk = (petId: string) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadPet());

		await authorizedAxios.get(`/pet/${petId}`).then(
			(response) => {
				dispatch(loadPetSuccess(response.data));
				console.log(response.data);
			})
			.catch((errorMessage) => {
				dispatch(loadPetFailure(errorMessage))
			})
	}
}
