import { RootState } from '../../index';
import { createSelector } from 'reselect';
import { AppState, FactsTypes } from '../../types';

const getState = (state: RootState) => state.catFacts;

export const selectCatFacts = createSelector(
	getState,
	(state: AppState<FactsTypes[]>) => state.data
)
