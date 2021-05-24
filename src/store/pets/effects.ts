import { Dispatch } from 'redux';
import { loadPets, loadPetsFailure, loadPetsSuccess } from './actions';
import authorizedAxios from '../../hooks/useAxiosInterceptors';

export const loadPetsReduxThunk = () => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadPets());

		await authorizedAxios.get('/pets').then(
			(response) => {
				console.log(response.data);
				dispatch(loadPetsSuccess(response.data));
			})
			.catch((errorMessage) => {
				dispatch(loadPetsFailure(errorMessage))
			})
	}
}
