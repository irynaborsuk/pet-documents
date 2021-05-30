import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import dogBreedsReducer from './store/dog-breeds/reducer';
import { catBreedsReducer } from './store/cat-breeds/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppState, Breed, FactsTypes, PetDataResponse, PetsResponse } from './types';
import petsReducer from './store/pets/reducer';
import petReducer from './store/pet/reducer';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ownerReducer from './store/owner-store/reducer';
import catFactsReducer from './store/cat-facts/reducer';
import dogFactsReducer from './store/dog-facts/reducer';

export interface RootState {
	catBreeds: AppState<Breed[]>;
	dogBreeds: AppState<Breed[]>;
	catFacts: AppState<FactsTypes[]>;
	dogFacts: AppState<FactsTypes[]>;
	pets: AppState<PetsResponse[]>;
	pet: AppState<PetDataResponse | null>;
}

const rootReducer = combineReducers({
	catBreeds: catBreedsReducer,
	dogBreeds: dogBreedsReducer,
	catFacts: catFactsReducer,
	dogFacts: dogFactsReducer,
	pets: petsReducer,
	pet: petReducer,
	owner: ownerReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<Auth0Provider
		domain="pet-documents.eu.auth0.com"
		audience="https://pet-documents.eu.auth0.com/api/v2/"
		clientId="ghskmgtIoPGnT2184jubYcgiDpfszapY"
		redirectUri={window.location.origin}
	>
		<Provider store={store}>
			<MuiPickersUtilsProvider utils={LuxonUtils} locale={window.navigator.language}>
				<App/>
			</MuiPickersUtilsProvider>
		</Provider>
	</Auth0Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// + TODO: All buttons cursor: pointer
// TODO: User menu redesign
// TODO: Height/Width should be hardcoded, theme.spacing should be used on margin/padding
// TODO: birth day calculator doesn't work
// TODO: Handle server errors with snackbars
