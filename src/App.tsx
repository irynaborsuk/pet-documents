import React, { Fragment } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dashboard from './containers/Dashboard/Dashboard';
import PetAccount from './containers/PetAccount/PetAccount';
import AddEditNewPet from './containers/PetAccount/AddEditNewPet';
import withLocalTheme from './hoc/withLocalTheme';
import { useAxiosInterceptors } from './hooks/useAxiosInterceptors';
import PetProfile from './containers/PetAccount/PetProfile';
import Header from './components/Header';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,

		content: {
			flexGrow: 1,
			padding: theme.spacing(3)
		}

	})
);

function App() {

	useAxiosInterceptors();

	const classes = useStyles();

	return (
		<Router>
			<main className={classes.content}>
				<div className={classes.toolbar}/>

				<Switch>
					<Fragment>
						<Header/>
						<Route path="/" exact><Dashboard/></Route>
						<Route path="/pet-account"><PetAccount/></Route>
						<Route path="/create-pet-form"><AddEditNewPet/></Route>
						<Route path={'/edit-pet/:id'}><AddEditNewPet/></Route>
						<Route path={'/pet/:id'}><PetProfile/></Route>
					</Fragment>
				</Switch>

			</main>
		</Router>
	);
}

export default withLocalTheme(App);
