import { loadCatBreeds, loadCatBreedsFailure, loadCatBreedsSuccessful } from './actions';
import { Dispatch } from 'redux';
import authorizedAxios from '../../hooks/useAxiosInterceptors';

export const loadCatBreedsReduxThunk = () => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadCatBreeds());

		return await authorizedAxios.get('/static/cat-breeds')
			.then((response) => {
				dispatch(loadCatBreedsSuccessful(response.data));
				console.log(response.data);
			})
			.catch((error) => {
				dispatch(loadCatBreedsFailure(error));
			})
	}
}
