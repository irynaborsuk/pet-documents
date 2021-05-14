import { Dispatch } from 'react';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { deletePetFailed, deletePetPending, deletePetSucceeded } from './actions';
import { History } from 'history';


export const deletePetReduxThunk = (petId: string, history: History) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(deletePetPending());

		await authorizedAxios.delete(`/pet/${petId}`).then(() => {
				dispatch(deletePetSucceeded());
				history.push('/pet-account');
			})
			.catch((error) => {
				dispatch(deletePetFailed(error));
		})
	}
}
