import React, { useEffect, useState } from 'react';
import {
	createStyles,
	Fab,
	Grid,
	Snackbar,
	useMediaQuery
} from '@material-ui/core';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
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
import { Announcement } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		scrollBox: {
			overflow: 'scroll',
			marginBottom: theme.spacing(30),
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			width: '100%',
			maxWidth: '1000px',
			[theme.breakpoints.down('xs')]: {
				marginBottom: 'auto'
			}
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
			[theme.breakpoints.down('xs')]: {
				height: 'auto',
				width: 'auto',
				right: '10px',
				bottom: '10px',
				background: 'none'
			}
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
			padding: theme.spacing(1)
		},

		//mobile styles
		mobileButton: {
			display: 'flex',
			flexDirection: 'column'
		},
		fabButton: {
			margin: 'theme.spacing(1), 0'
		},
		factsBlock: {
			display: 'flex',
			flexDirection: 'column'
		},
		factsBlockButton: {
			display: 'flex',
			justifyContent: 'flex-end'
		},
		factsBlockCarousel: {
			background: theme.palette.primary.main,
			padding: theme.spacing(1),
			borderRadius: theme.spacing(1)
		}
	})
)

const theme = createMuiTheme({});

const PetAccount = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { isAuthenticated } = useAuth0();
	const userHasPets: boolean = useSelector(selectUserHasPets);
	const sm = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		dispatch(loadPetsReduxThunk());
	}, [dispatch])

	useEffect(() => {
		return () => {
			dispatch(resetPetsStore())
		}
	}, [dispatch])

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
				{sm ?
					<>
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
					</>
					:
					<div className={classes.mobileButton}>
						<Fab
							className={classes.fabButton}
							onClick={() => {
								history.push('/create-pet-form')
							}}
							color="primary"
							aria-label="add"
						>
							<AddIcon/>
						</Fab>
						<Fab
							className={classes.fabButton}
							onClick={handleClickOpen}
							color="secondary"
							aria-label="add"
						>
							<Announcement/>
						</Fab>
						<Snackbar
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center'
							}}
							open={open}
							onClose={handleClose}
						>
							<div className={classes.factsBlock}>
								<div className={classes.factsBlockButton}>
									<Fab
										onClick={handleClose}
										color="primary"
									>
										<CloseIcon fontSize="small"/>
									</Fab>
								</div>
								<div className={classes.factsBlockCarousel}>
									<CarouselInfo/>
								</div>
							</div>
						</Snackbar>
					</div>
				}

			</footer>

		</Grid>
	);
}

export default PetAccount;
