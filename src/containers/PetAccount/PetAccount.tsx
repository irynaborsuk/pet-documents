import React, { useEffect } from 'react';
import { Container, createStyles, CssBaseline, Fab, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserHasPets } from '../../store/pets/selectors';
import { loadPetsReduxThunk } from '../../store/pets/effects';
import PetsAddCard from '../../components/PetsAddCard';
import PetsCardsList from '../../components/PetsCardsList';
import { resetPetsStore } from '../../store/pets/actions';
import CarouselInfo from '../CaruselInfo/CarouselInfo';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		scrollBox: {
			overflow: 'scroll',
			marginBottom: '240px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			width: '100%',
			maxWidth: '1000px',
			[theme.breakpoints.down('sm')]: {

			},
		},
		footer: {
			position: 'fixed',
			bottom: '0',
			width: '100%',
			maxWidth: '1000px',
			alignItems: 'center',
			backgroundColor: theme.palette.background.default,
			display: 'flex',
			height: '230px',
			[theme.breakpoints.down('sm')]: {
				flexDirection: 'column',
			},
		},
		carousel: {
			width: '100%',
			maxWidth: '1000px',
			flexShrink: 0
		},
		addButton: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignSelf: 'self-end',
			padding: '10px',
		}
	})
)

const PetAccount = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { isAuthenticated } = useAuth0();
	const userHasPets: boolean = useSelector(selectUserHasPets);

	useEffect(() => {
		dispatch(loadPetsReduxThunk());
	}, [])

	useEffect(() => {
		return () => {
			dispatch(resetPetsStore())
		}
	}, [])

	if (!isAuthenticated) {
		return <h3>Please, sign in first to open a pet account!</h3>;
	}

	return (

		<Grid
			className={classes.root}
			container
			spacing={1}
		>
			<main
				className={classes.scrollBox}
			>
				{
					isAuthenticated && (

						<Grid item container xs={12}>
							{!userHasPets ? <PetsAddCard/> : <PetsCardsList/>}
						</Grid>

					)
				}
			</main>

			<footer
				className={classes.footer}
			>
				<Grid item container xs={12} sm={10}>
					<div className={classes.carousel}>
						<CarouselInfo/>
					</div>
				</Grid>
				<Grid
					className={classes.addButton}
					item container xs={12} sm={2}
				>
					<Fab
						onClick={() => {
							history.push('/create-pet-form')
						}}
						color="primary"
						aria-label="add"
					>
						<AddIcon/>
					</Fab>
				</Grid>
			</footer>
		</Grid>
	);
}

export default PetAccount;
