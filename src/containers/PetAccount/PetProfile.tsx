import React, { useEffect } from 'react';
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	makeStyles,
	Typography
} from '@material-ui/core';
import { GENDER, PetDataResponse, SPECIES } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { loadPetReduxThunk } from '../../store/pet/effects';
import { selectPet } from '../../store/pet/selectors';
import { useParams } from 'react-router';
import PetProfileHeader from './PetProfileHeader';
import catIcon from '../../images/catIcon512.png';
import dogIcon from '../../images/dogIcon512.png';
import { createStyles, Theme } from '@material-ui/core/styles';
import femaleIcon from '../../images/femaleIcon.svg';
import maleIcon from '../../images/maleIcon.svg';
import { DateTime } from 'luxon';
import { calcDate } from '../../utils/formatters';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		large: {
			width: theme.spacing(10),
			height: theme.spacing(10),
		},
		displayFlex: {
			display: 'flex',
		},
		displayFlexColumn: {
			display: 'flex',
			flexDirection: 'column'
		},
		genderImg: {
			width: '1em',
			height: '1em',
			margin: '5px'
		},
		typographyAdditionInfo: {
			display: 'flex',
		},
	}),
);

const PetProfile = () => {
	const classes = useStyles();
	const pet: PetDataResponse | null = useSelector(selectPet);
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const currentTime = DateTime.local();

	useEffect(() => {
		dispatch(loadPetReduxThunk(id));
	}, [])

	if (!pet) {
		return <></>;
	}

	return (
		<Grid item xs={12}>
			{/*TODO: think how to split for a small components*/}
			{/*TODO: separate more grid items*/}
			<Card key={pet._id}>
				<CardHeader
					avatar={
						<Avatar
							variant="square"
							className={classes.large}
							src={pet.species === SPECIES.CAT ? catIcon : dogIcon}
						/>
					}
					title={pet.name}
					subheader={<div className={classes.displayFlexColumn}>
						<div className={classes.displayFlex}>Breed: {pet.breed.name}</div>
						<div className={classes.displayFlex}>Gender:
							<img
								className={classes.genderImg}
								src={pet.gender === GENDER.FEMALE ? femaleIcon : maleIcon}
								alt={'gender icon'}
							/>
						</div>

					</div>}
				/>
				<CardContent>
					{/*TODO: add styles and work with them*/}
					<Typography className={classes.typographyAdditionInfo}>
						Date of birth: {DateTime.fromISO(pet.dateOfBirth).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
					</Typography>
					<Typography className={classes.typographyAdditionInfo}>
						Colour: {pet.colour}
					</Typography>
					<Typography className={classes.typographyAdditionInfo}>
						{pet.notes? <>Notes: {pet.notes}</> : null}
					</Typography>
				</CardContent>
				<CardActions>
					{/*TODO: add owners*/}
					{/*TODO: delete owner*/}
					{/*TODO: user can edit pet profile*/}
					{/*TODO: user can delete pet profile*/}
				</CardActions>
			</Card>
		</Grid>
	);
};

export default PetProfile;
