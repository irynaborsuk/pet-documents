import React from 'react';
import { Card, CardActions, CardHeader, createStyles, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

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
		}
	})
)

const PetAccount = () => {
	const classes = useStyles();
	const history = useHistory();
	const { isAuthenticated } = useAuth0();

	if (!isAuthenticated) {
		return <h3>Please, sign in first to open a pet account!</h3>;
	}

	return (
		<div className={classes.root}>
			{
				isAuthenticated && (
					<Card className={classes.card}>
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
				)
			}

		</div>

	);
};

export default PetAccount;
