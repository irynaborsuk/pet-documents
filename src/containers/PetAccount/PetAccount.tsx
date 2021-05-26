import React, { useEffect } from 'react';
import { createStyles} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserHasPets } from '../../store/pets/selectors';
import { loadPetsReduxThunk } from '../../store/pets/effects';
import PetsAddCard from '../../components/PetsAddCard';
import PetsCardsList from '../../components/PetsCardsList';
import { resetPetsStore } from '../../store/pets/actions';
import CarouselInfo from '../CaruselInfo/CarouselInfo';

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
			maxWidth: '1000px'
		}
	})
)

const PetAccount = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
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
		<div className={classes.root}>
			{
				isAuthenticated && (
					<div className={classes.card}>
						{!userHasPets ? <PetsAddCard/> : <PetsCardsList/>}
					</div>
				)
			}


		</div>
	);
}

export default PetAccount;
