import { Dispatch } from 'redux';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import {
	createPetFailed,
	createPetPending, createPetSucceeded,
	deletePetFailed,
	deletePetPending,
	deletePetSucceeded, editPetFailed, editPetPending, editPetSucceeded,
	loadPet,
	loadPetFailure,
	loadPetSuccess
} from './actions';
import { History } from 'history';

export const createPetReduxThunk = (data: object, history: History) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(createPetPending());

		await authorizedAxios.post('/pet/create', data)
			.then((response) => {
				dispatch(createPetSucceeded(response.data));
				history.push('/pet-account');
			})
			.catch((error) => {
				dispatch(createPetFailed(error))
			})
	}
}

export const editPetReduxThunk = (petId: string, data: object, history: History) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(editPetPending())

		await authorizedAxios.patch( `/pet/${petId}`, data).then(
			(response) => {
				dispatch(editPetSucceeded(response.data));
				history.push(`/pet/${petId}`);
			})
			.catch((error) => {
				dispatch(editPetFailed(error))
			})
	}
}

export const loadPetReduxThunk = (petId: string) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadPet());

		await authorizedAxios.get(`/pet/${petId}`).then(
			(response) => {
				dispatch(loadPetSuccess(response.data));
				console.log(response.data);
			})
			.catch((errorMessage) => {
				dispatch(loadPetFailure(errorMessage))
			})
	}
}

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
