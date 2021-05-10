import { RootState } from '../../index';
import { createSelector } from 'reselect';
import { AppState, PetDataResponse } from '../../types';

const getState = (state: RootState): AppState<PetDataResponse | null> => state.pet;

export const selectPetIsLoading = createSelector(
	getState,
	(state: AppState<PetDataResponse | null>) => state.isLoading
)
export const selectPet = createSelector(
	getState,
	(state: AppState<PetDataResponse | null>) => state.data
)
export const selectPetError = createSelector(
	getState,
	(state: AppState<PetDataResponse | null>) => state.errorMessage
)
export const selectPetLoaded = createSelector(
	getState,
	(state: AppState<PetDataResponse | null>) => !!state.data && !state.isLoading
)
export const selectIsPetLoading = createSelector(
	getState,
	(state: AppState<PetDataResponse | null>) => state.isLoading
)
