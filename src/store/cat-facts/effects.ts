import { Dispatch } from 'redux';
import { loadCatFactsFailed, loadCatFactsPending, loadCatFactsSuccess } from './action';
import authorizedAxios from '../../hooks/useAxiosInterceptors';

export const catFactsReduxThunk = () => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadCatFactsPending());

		await authorizedAxios.get('/static/cat-facts').then(
			(response) => {
				dispatch(loadCatFactsSuccess(response.data));
			})
			.catch((error) => {
				dispatch(loadCatFactsFailed(error))
			})
	}

}
