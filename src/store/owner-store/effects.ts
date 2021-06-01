import { Dispatch } from 'redux';
import {
	addAnOwnerFailed,
	addAnOwnerPending,
	addAnOwnerSucceeded, removeAnOwnerFailed,
	removeAnOwnerPending,
	removeAnOwnerSucceeded
} from './action';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { IAddAnOwner, IRemoveAnOwnerId } from '../../types';
import { ProviderContext } from 'notistack';

export const addAnOwnerReduxThunk = (
	petId: string,
	addAnnOwnerData: IAddAnOwner,
	{ enqueueSnackbar }: ProviderContext
) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(addAnOwnerPending());

		try {
			const res = await authorizedAxios.patch(`/pet/${petId}/add-owner`, addAnnOwnerData)
			dispatch(addAnOwnerSucceeded(res.data));
		} catch (error) {
			dispatch(addAnOwnerFailed(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}

export const removeAnOwnerReduxThunk = (
	petId: string,
	removeAnOwnerId: IRemoveAnOwnerId,
	{ enqueueSnackbar }: ProviderContext
) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(removeAnOwnerPending());

		try {
			await authorizedAxios.patch(`/pet/${petId}/remove-owner`, removeAnOwnerId);
			dispatch(removeAnOwnerSucceeded());
		} catch (error) {
			dispatch(removeAnOwnerFailed(error));
			dispatch(() => enqueueSnackbar(
				error?.data?.message ?? 'Something went wrong.',
				{ variant: 'error' }
			))
		}
	}
}
