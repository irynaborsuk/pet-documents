import React, { useEffect } from 'react';
import { Card, CardActions, CardHeader, createStyles, Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import authorizedAxios from '../../hooks/useAxiosInterceptors';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center'

		},
		card: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			maxWidth: '900px',
		},
		buttonAction: {
			justifyContent: 'flex-end'
		},
		arrowButton: {
			color: theme.palette.primary.main
		},
		addButton: {
			position: 'fixed',
			bottom: '20px',
			right: '20px'
		}
	})
)

const PetAccount = () => {
	const classes = useStyles();
	const history = useHistory();
	const { isAuthenticated } = useAuth0();

	const getPetsData = async () => {
		const response = await authorizedAxios.get('/pets');
		console.log(response.data);
	}

	useEffect(() => {
		getPetsData();
	}, [])

	if (!isAuthenticated) {
		return <h3>Please, sign in first to open a pet account!</h3>;
	}

	return (
		<div className={classes.root}>
			{
				isAuthenticated && (
					<div className={classes.card}>
						<Card>
							<CardHeader
								title="Add a pet"
							/>
							<CardActions className={classes.buttonAction}>
								<IconButton
									className={classes.arrowButton}
									onClick={() => {
										history.push('/create-pet-form')
									}}
									aria-label="add to favorites">
									<ArrowForwardIcon/>
								</IconButton>
							</CardActions>
						</Card>

						<Fab className={classes.addButton} color="primary" aria-label="add">
							<AddIcon

								onClick={() => {
									history.push('/create-pet-form')
								}}
							/>
						</Fab>
					</div>

				)
			}
		</div>

	);
};

export default PetAccount;
