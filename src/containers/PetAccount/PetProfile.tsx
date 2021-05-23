import React, { useEffect } from 'react';
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	makeStyles
} from '@material-ui/core';
import { PetDataResponse, SPECIES } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { loadPetReduxThunk } from '../../store/pet/effects';
import { selectPet } from '../../store/pet/selectors';
import { useParams } from 'react-router';
import catIcon from '../../images/catIcon512.png';
import dogIcon from '../../images/dogIcon512.png';
import { createStyles, Theme } from '@material-ui/core/styles';
import PetInfoBlock from './PetInfoBlock';
import PetsActionButtons from './PetsActionButtons';
import PetsSubtitleData from './PetsSubtitleData';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center'
		},
		petCard: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			maxWidth: '900px'
		},
		large: {
			width: theme.spacing(12),
			height: theme.spacing(12)
		},
		avatarStyles: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		cardHeaderStyles: {
			textAlign: 'left',
			[theme.breakpoints.down('sm')]: {
				width: '100%',
				textAlign: 'center',
			},
		},
		cardActionsStyles: {
			justifyContent: 'flex-end',
			[theme.breakpoints.down('sm')]: {
				justifyContent: 'center',
			},
		}
	})
);

const PetProfile = () => {
	const classes = useStyles();
	const pet: PetDataResponse | null = useSelector(selectPet);
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadPetReduxThunk(id));
	}, [dispatch, id])

	if (!pet) {
		return <></>;
	}

	return (
		<Grid item xs={12} className={classes.root}>
			<Card key={pet._id} className={classes.petCard}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={2} className={classes.avatarStyles}>
						<Avatar
							variant="square"
							className={classes.large}
							src={pet.species === SPECIES.CAT ? catIcon : dogIcon}
						/>
					</Grid>
					<Grid item xs={12} md={6} className={classes.cardHeaderStyles}>
						<CardHeader
							title={<h1>{pet.name}</h1>}
							subheader={<PetsSubtitleData/>}
						/>
					</Grid>
					<Grid item xs={12} md={4} >
						<CardActions className={classes.cardActionsStyles}>
							<PetsActionButtons petId={pet._id}/>
						</CardActions>
					</Grid>
				</Grid>
				{/*TODO: add owners*/}
				{/*TODO: delete owner*/}
				<CardContent>
					<Grid container
						  justify="center"
						  alignItems="stretch"
						  spacing={1}
					>
						<Grid item container
							  direction="column"
							  xs={12} md={7}
						>
							<Card>
								{/*TODO: field for component*/}
							</Card>
						</Grid>
						<Grid item container
							  direction="column"
							  xs={12} md={5}
						>
							<PetInfoBlock
								dateOfBirth={pet.dateOfBirth}
								colour={pet.colour}
								notes={pet.notes ? <>{pet.notes}</> : null}
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default PetProfile;
