import { createSelector } from 'reselect'
import { AppState, Breed } from '../../types';
import { RootState } from '../../index';

const getState = (state: RootState) => state.catBreeds;

export const selectCatBreedsIsLoading = createSelector(
	getState,
	(state: AppState<Breed[]>) => state.isLoading
)
export const selectCatBreeds = createSelector(
	getState,
	(state: AppState<Breed[]>) => state.data
)
export const selectCatBreedsError = createSelector(
	getState,
	(state: AppState<Breed[]>) => state.errorMessage
)

export const selectIsCatBreedsLoaded = createSelector(
	getState,
	(state: AppState<Breed[]>) => !!state.data.length && !state.isLoading
)

// Component
// const catBreeds: AppState<Breed[] | null> = useSelect(selectCatBreeds);
