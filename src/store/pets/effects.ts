import { Dispatch } from 'redux';
import { loadPetsPending, loadPetsFailure, loadPetsSuccess } from './actions';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { ProviderContext } from 'notistack';

export const loadPetsReduxThunk = ({ enqueueSnackbar }: ProviderContext) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadPetsPending());

		try {
			const response = await authorizedAxios.get('/pets');
			dispatch(loadPetsSuccess(response.data));
		} catch (error) {
			dispatch(loadPetsFailure(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}
