import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { Dispatch } from 'redux';
import { getDogBreedFailure, getDogBreeds, getDogBreedsSuccess } from './actions';
import { ProviderContext } from 'notistack';

export const getDogBreedsReduxThunk = ({ enqueueSnackbar }: ProviderContext) => {
	return async (dispatch: Dispatch<any>) => {
			dispatch(getDogBreeds());

		try {
			const response = await authorizedAxios.get('/static/dog-breeds');
			dispatch(getDogBreedsSuccess(response.data))
		} catch (error) {
			dispatch(getDogBreedFailure(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}

	/* https://github.com/reduxjs/redux-thunk/blob/master/src/index.js

	function createThunkMiddleware(extraArgument) {
	  return ({ dispatch, getState }) => (next) => (action) => {
		if (typeof action === 'function') {
		  return action(dispatch, getState, extraArgument);
		}

		return next(action);
	  };
	}

	const thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	export default thunk; */
}
