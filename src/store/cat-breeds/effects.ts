import { loadCatBreeds, loadCatBreedsFailure, loadCatBreedsSuccessful } from './actions';
import { Dispatch } from 'redux';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { ProviderContext } from 'notistack';

export const loadCatBreedsReduxThunk = ({ enqueueSnackbar }: ProviderContext) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadCatBreeds());

		try {
			const response = await authorizedAxios.get('/static/cat-breeds');
			dispatch(loadCatBreedsSuccessful(response.data));
		} catch (error) {
			dispatch(loadCatBreedsFailure(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}
