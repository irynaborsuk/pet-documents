import React, { useEffect } from 'react';
import { Card, createStyles, useMediaQuery } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { CarouselStyleProps, FactsTypes } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { catFactsReduxThunk } from '../../store/cat-facts/effects';
import { selectCatFacts } from '../../store/cat-facts/selectors';
import { selectDogFacts } from '../../store/dog-facts/selectors';
import { dogFactsReduxThunk } from '../../store/dog-facts/effects';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme:Theme) =>
	createStyles({
		cardInfo: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
			fontSize: 'larger',
			fontFamily: 'cursive',
			minHeight: '150px',
			padding: theme.spacing(1),
			[theme.breakpoints.up('sm')]: {
				padding: theme.spacing(9),
			},
		},
		cardContent: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
			minHeight: 'inherit',
		},
		cardContentTitle: {
			display: 'flex',
			color: theme.palette.primary.dark,
			fontSize: 'x-large'
		},
		cardContentItem: {
			display: 'flex',
		},
	})
)

const navButtonStyle: CarouselStyleProps = {
	className: 'navButton',
	style: {
		backgroundColor: "var(--color-basic-green)",
		opacity: 0.3,
	}
}

const theme = createMuiTheme({});

const CarouselInfo = () => {
	const sm = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
	const classes = useStyles();
	const dispatch = useDispatch();
	const snackBar = useSnackbar();
	const catsFacts: FactsTypes[] = useSelector(selectCatFacts);
	const dogsFacts: FactsTypes[] = useSelector(selectDogFacts);

	const items: Array<object> = [];
	items.push(...catsFacts, ...dogsFacts);
	shuffle(items);
	console.log(items);

	function shuffle(a: any) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}


	useEffect(() => {
		dispatch(catFactsReduxThunk(snackBar));
		dispatch(dogFactsReduxThunk(snackBar));
	}, [dispatch, snackBar])

	return (
		<Carousel
			autoPlay={false}
			stopAutoPlayOnHover={true}
			fullHeightHover={true}
			animation={'slide'}
			indicators={false}
			interval={12000}
			swipe={true} // for mobile version instead of button will be swappable
			navButtonsAlwaysInvisible={!sm}
			navButtonsProps={navButtonStyle}
		>
			{
				items.map((item: any) => {
					return <Card
						key={item._id}
						className={classes.cardInfo}
						elevation={10}
					>
						<div className={classes.cardContent}>
							<div className={classes.cardContentTitle}>Interesting Fact!</div>
							<div className={classes.cardContentItem}>{item.name}</div>
						</div>
					</Card>
				})
			}
		</Carousel>
	);
};

export default CarouselInfo;
