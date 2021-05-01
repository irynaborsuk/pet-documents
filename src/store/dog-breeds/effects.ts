import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { Dispatch } from 'redux';
import { getDogBreedFailure, getDogBreeds, getDogBreedsSuccess } from './actions';

export const getDogBreedsReduxThunk = () => {
	return async (dispatch: Dispatch<any>) => {
			dispatch(getDogBreeds());

		 return await authorizedAxios.get('/static/dog-breeds')
			.then((response) => {
				console.log(response.data);
				dispatch(getDogBreedsSuccess(response.data))
			})
			.catch((error) => {
				dispatch(getDogBreedFailure(error))
			})

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
