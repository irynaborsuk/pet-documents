import { createSelector } from 'reselect';
import { AppState, AutocompleteOption, Breed } from '../../types';
import { RootState } from '../../index';
import { mapBreedsToAutoCompleteOptions } from '../../utils/formatters';

const getState = (state: RootState) => state.dogBreeds;

export const selectDogBreedsIsLoading = createSelector(
	getState,
	(state: AppState<Breed[]>) => state.isLoading
)
export const selectDogBreeds = createSelector(
	getState,
	(state: AppState<Breed[]>) => state.data
)
export const selectDogBreedsAutocomplete = createSelector(
	getState,
	(state: AppState<Breed[]>): AutocompleteOption<string>[] => mapBreedsToAutoCompleteOptions(state.data)
)
export const selectDogBreedsError = createSelector(
	getState,
	(state: AppState<Breed[]>) => state.errorMessage
)
export const selectIsDogBreedsLoaded = createSelector(
	getState,
	(state: AppState<Breed[]>) => !!state.data.length && !state.isLoading
)
export const selectIsDogBreedsLoading = createSelector(
	getState,
	(state: AppState<Breed[]>) => state.isLoading
)
