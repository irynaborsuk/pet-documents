import { AppState, Breed } from '../../types';
import { CatBreedsActionTypes, LOAD_CAT_BREEDS, LOAD_CAT_BREEDS_FAILURE, LOAD_CAT_BREEDS_SUCCESSFUL } from './types';


export function catBreedsReducer(state: AppState<Breed[]> = {
	isLoading: false,
	data: [],
	errorMessage: ''
}, action: CatBreedsActionTypes): AppState<Breed[]> {
	switch (action.type) {
		case LOAD_CAT_BREEDS: {
			return {
				isLoading: true,
				data: [],
				errorMessage: ''
			}
		}
		case LOAD_CAT_BREEDS_SUCCESSFUL: {
			return {
				isLoading: false,
				data: action.payload,
				errorMessage: ''
			}
		}
		case LOAD_CAT_BREEDS_FAILURE: {
			return {
				isLoading: false,
				data: [],
				errorMessage: action.payload
			}
		}
		default:
			return state
	}
}
