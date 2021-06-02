import React, { Fragment } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route, Redirect
} from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PetAccount from './containers/PetAccount/PetAccount';
import AddEditNewPet from './containers/PetAccount/AddEditNewPet';
import withLocalTheme from './hoc/withLocalTheme';
import { useAxiosInterceptors } from './hooks/useAxiosInterceptors';
import PetProfile from './containers/PetAccount/PetProfile';
import Header from './components/Header';
import { useAuth0 } from '@auth0/auth0-react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,

		content: {
			flexGrow: 1,
			padding: theme.spacing(3)
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: theme.palette.primary.dark,
		},
	})
);

function App() {

	useAxiosInterceptors();
	const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

	const classes = useStyles();

	if (isLoading) {
		return (
			<Backdrop className={classes.backdrop} open={isLoading}>
				<CircularProgress color="inherit" size={100}/>
			</Backdrop>
		)
	}

	if (!isAuthenticated) {
		loginWithRedirect();
		return <></>;
	}

	return (
		<Router>
			<main className={classes.content}>
				<div className={classes.toolbar}/>

				<Switch>
					<Fragment>
						<Header/>
						<Route path="/pet-account"><PetAccount/></Route>{' '}
						<Route path="/create-pet-form"><AddEditNewPet/></Route>
						<Route path={'/edit-pet/:id'}><AddEditNewPet/></Route>
						<Route path={'/pet/:id'}><PetProfile/></Route>
						<Redirect exact from="/" to="/pet-account"/>
					</Fragment>
				</Switch>

			</main>
		</Router>
	);
}

export default withLocalTheme(App);
