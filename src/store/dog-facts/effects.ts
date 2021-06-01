import { Dispatch } from 'redux';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { loadDogFactsFailed, loadDogFactsPending, loadDogFactsSuccess } from './actions';
import { ProviderContext } from 'notistack';

export const loadDogFactsReduxThunk = ({ enqueueSnackbar }: ProviderContext) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadDogFactsPending());

		try {
			const response = await authorizedAxios.get('/static/dog-facts');
			dispatch(loadDogFactsSuccess(response.data));
		} catch (error) {
			dispatch(loadDogFactsFailed(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}
