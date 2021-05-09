import React from 'react';
import { GENDER, PetDataResponse, SPECIES } from '../types';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardHeader, createStyles, Fab } from '@material-ui/core';
import { calcDate } from '../utils/formatters';
import femaleIcon from '../images/femaleIcon.svg';
import maleIcon from '../images/maleIcon.svg';
import catIcon from '../images/catIcon512.png';
import dogIcon from '../images/dogIcon512.png';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectPets } from '../store/pets/selectors';
import { DateTime } from 'luxon';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		addButton: {
			position: 'fixed',
			bottom: '20px',
			right: '20px'
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
	const pets: PetDataResponse[] = useSelector(selectPets);
	const currentTime = DateTime.local();
//	const petDataById: PetDataResponse[] = useSelector(selectPet);
//	const isPetsLoading = useSelector(selectIsPetsLoading);

	return (
		<Grid container spacing={2}>
			{pets.map((pet: PetDataResponse) => {
				return (
					<Grid item xs={12} sm={6} key={pet._id}>
						<Card
							key={pet._id}
							// на onClick перенаправляє на іншу сторінку - history.push()
							//onClick={() => dispatch(loadPetReduxThunk(pet._id))}
						>
							<CardHeader title={pet.name}/>
							<CardContent className={classes.cardContent}>
								<div className={classes.cardContentMain}>
									<>{calcDate(currentTime, pet.dateOfBirth)}</>
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

			<Fab className={classes.addButton} color="primary" aria-label="add">
				<AddIcon
					onClick={() => {
						history.push('/create-pet-form')
					}}
				/>
			</Fab>
		</Grid>
	);
};

export default PetsCardsList;
