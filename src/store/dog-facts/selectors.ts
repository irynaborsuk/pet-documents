import { RootState } from '../../index';
import { createSelector } from 'reselect';
import { AppState, FactsTypes } from '../../types';

const getState = (state: RootState) => state.dogFacts;

export const selectDogFacts = createSelector(
	getState,
	(state: AppState<FactsTypes[]>) => state.data
)
