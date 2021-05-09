import React from 'react';
import { Card, CardActions, CardHeader, createStyles, Grid, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		buttonAction: {
			justifyContent: 'flex-end'
		},
		arrowButton: {
			color: theme.palette.primary.main
		}
	})
)

const PetsAddCard = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Grid item xs={12}>
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
		</Grid>
	);
};

export default PetsAddCard;
