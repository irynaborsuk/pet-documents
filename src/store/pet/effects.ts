import { Dispatch } from 'react';
import { loadPets, loadPetsFailure, loadPetsSuccess } from '../pets/actions';
import authorizedAxios from '../../hooks/useAxiosInterceptors';

export const loadPetReduxThunk = (petId: string) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadPets());

		await authorizedAxios.get(`pet/${petId}`).then(
			(response) => {
				dispatch(loadPetsSuccess(response.data));
				console.log(response.data);
			})
			.catch((errorMessage) => {
				dispatch(loadPetsFailure(errorMessage))
			})
	}
}
