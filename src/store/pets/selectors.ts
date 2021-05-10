import { createSelector } from 'reselect';
import { AppState, PetsResponse } from '../../types';
import { RootState } from '../../index';

const getState = (state: RootState) => state.pets;

export const selectPetsIsLoading = createSelector(
	getState,
	(state: AppState<PetsResponse[]>) => state.isLoading
)
export const selectPets = createSelector(
	getState,
	(state: AppState<PetsResponse[]>) => state.data
)
export const selectPetsError = createSelector(
	getState,
	(state: AppState<PetsResponse[]>) => state.errorMessage
)
export const selectPetsLoaded = createSelector(
	getState,
	(state: AppState<PetsResponse[]>) => !!state.data.length && !state.isLoading
)
export const selectIsPetsLoading = createSelector(
	getState,
	(state: AppState<PetsResponse[]>) => state.isLoading
)
export const selectUserHasPets = createSelector(
	getState,
	selectPetsLoaded,
	(state: AppState<PetsResponse[]>, isLoaded:  boolean) => isLoaded && !!state.data.length
)
