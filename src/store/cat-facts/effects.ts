import { Dispatch } from 'redux';
import { loadCatFactsFailed, loadCatFactsPending, loadCatFactsSuccess } from './action';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { ProviderContext } from 'notistack';

export const catFactsReduxThunk = ({ enqueueSnackbar }: ProviderContext) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadCatFactsPending());

		try {
			const response = await authorizedAxios.get('/static/cat-facts');
			dispatch(loadCatFactsSuccess(response.data));
		} catch (error) {
			dispatch(loadCatFactsFailed(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}
