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
import { ProviderContext } from 'notistack';

export const createPetReduxThunk = (
	data: object,
	history: History,
	{ enqueueSnackbar }: ProviderContext
) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(createPetPending());

		try {
			const response = await authorizedAxios.post('/pet/create', data);
			dispatch(createPetSucceeded(response.data));
			history.push('/pet-account');
		} catch (error) {
			dispatch(createPetFailed(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}

export const editPetReduxThunk = (
	petId: string,
	data: object,
	history: History,
	{ enqueueSnackbar }: ProviderContext
) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(editPetPending())

		try {
			const response = await authorizedAxios.patch(`/pet/${petId}`, data);
			dispatch(editPetSucceeded(response.data));
			history.push(`/pet/${petId}`);
		} catch (error) {
			dispatch(editPetFailed(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}

export const loadPetReduxThunk = (petId: string, { enqueueSnackbar }: ProviderContext) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loadPet());

		try {
			const response = await authorizedAxios.get(`/pet/${petId}`);
			dispatch(loadPetSuccess(response.data));
		} catch (error) {
			dispatch(loadPetFailure(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}

export const deletePetReduxThunk = (petId: string, history: History, { enqueueSnackbar }: ProviderContext) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(deletePetPending());

		try {
			await authorizedAxios.delete(`/pet/${petId}`);
			dispatch(deletePetSucceeded());
			history.push('/pet-account');
		} catch (error) {
			dispatch(deletePetFailed(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}
