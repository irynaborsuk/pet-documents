import React from 'react';
import { GENDER, PetsResponse, SPECIES } from '../types';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardHeader, createStyles } from '@material-ui/core';
import { calcDate } from '../utils/formatters';
import femaleIcon from '../images/femaleIcon.svg';
import maleIcon from '../images/maleIcon.svg';
import catIcon from '../images/catIcon512.png';
import dogIcon from '../images/dogIcon512.png';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectPets } from '../store/pets/selectors';
import { DateTime } from 'luxon';

const useStyles = makeStyles(() =>
	createStyles({
		card: {
			cursor: 'pointer'
		},
		cardContent: {
			display: 'flex',
			width: '100%',
			justifyContent: 'space-between'
		},
		cardContentMain: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			justifyContent: 'space-around'
		},
		cardContentGenderImg: {
			width: '2em',
			height: '2em'
		},
		cardContentSpeciesImg: {
			width: '6em',
			height: '6em'
		}
	})
)

const PetsCardsList = () => {
	const classes = useStyles();
	const history = useHistory();
	const pets: PetsResponse[] = useSelector(selectPets);
	const currentTime = DateTime.local();

	return (
		<Grid container spacing={2}>
			{pets.map((pet: PetsResponse) => {
				return (
					<Grid item xs={12} sm={6} key={pet._id}>
						<Card
							key={pet._id}
							onClick={() => history.push(`/pet/${pet._id}`)}
							className={classes.card}
						>
							<CardHeader title={pet.name}/>
							<CardContent className={classes.cardContent}>
								<div className={classes.cardContentMain}>
									<>Age: {calcDate(currentTime, pet.dateOfBirth)}</>
									<img
										className={classes.cardContentGenderImg}
										src={pet.gender === GENDER.FEMALE ? femaleIcon : maleIcon}
										alt="gender icon"
									/>
								</div>
								<img
									className={classes.cardContentSpeciesImg}
									src={pet.species === SPECIES.CAT ? catIcon : dogIcon}
									alt="pet icon"
								/>
							</CardContent>
						</Card>
					</Grid>
				)
			})}
		</Grid>
	);
};

export default PetsCardsList;
