import React from 'react';
import { Card, CardActions, CardHeader, createStyles, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() =>
	createStyles({
		buttonAction: {
			justifyContent: 'flex-end'
		},
		arrowButton: {
			color: 'teal'
		}
	})
)

const PetAccount = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Card>
			<CardHeader
				title="Add a pet"
			/>
			<CardActions className={classes.buttonAction}>
				<IconButton
					className={classes.arrowButton}
					onClick={() => {history.push('/create-pet-form')}}
					aria-label="add to favorites">
					<ArrowForwardIcon/>
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default PetAccount;