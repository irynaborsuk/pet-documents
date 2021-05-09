import { RootState } from '../../index';
import { createSelector } from 'reselect';
import { AppState, PetDataResponse } from '../../types';

const getState = (state: RootState) => state.pets;

export const selectPetIsLoading = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => state.isLoading
)
export const selectPet = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => state.data
)
export const selectPetError = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => state.errorMessage
)
export const selectPetLoaded = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => !!state.data.length && !state.isLoading
)
export const selectIsPetLoading = createSelector(
	getState,
	(state: AppState<PetDataResponse[]>) => state.isLoading
)
