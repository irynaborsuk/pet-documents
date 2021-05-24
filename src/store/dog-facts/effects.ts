import { Dispatch } from 'redux';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { loadDogFactsFailed, loadDogFactsPending, loadDogFactsSuccess } from './actions';

export const dogFactsReduxThunk = () => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadDogFactsPending());

		await authorizedAxios.get('/static/dog-facts').then(
			(response) => {
				dispatch(loadDogFactsSuccess(response.data));
			})
			.catch((error) => {
				dispatch(loadDogFactsFailed(error))
			})
	}
}
