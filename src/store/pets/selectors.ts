import { createSelector } from 'reselect';
import { AppState, PetDataResponse } from '../../types';
import { RootState } from '../../index';

const getState = (state: RootState) => state.pets;

export const selectPetsIsLoading = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => state.isLoading
)
export const selectPets = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => state.data
)
export const selectPetsError = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => state.errorMessage
)
export const selectPetsLoaded = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => !!state.data.length && !state.isLoading
)
export const selectIsPetsLoading = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => state.isLoading
)
export const selectUserHasPets = createSelector(
	getState,
	selectPetsLoaded,
	(state: AppState<PetDataResponse[]>, isLoaded:  boolean) => isLoaded && !!state.data.length
)
