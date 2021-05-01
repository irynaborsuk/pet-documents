import { AppState } from '../types';

export const getInitialState = <T>(): AppState<T | null> => {
	return {
		isLoading: false,
		data: null,
		errorMessage: ''
	};
}
