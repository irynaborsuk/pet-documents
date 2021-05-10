import React, { useEffect, useState } from 'react';
import { Card, createStyles, useMediaQuery } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { CarouselStyleProps } from '../../types';
import authorizedAxios from '../../hooks/useAxiosInterceptors';

const useStyles = makeStyles((theme:Theme) =>
	createStyles({
		cardInfo: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
			fontSize: 'larger',
			fontFamily: 'cursive',
			minHeight: '150px',
			padding: '10px',
			[theme.breakpoints.up('sm')]: {
				padding: '0 70px',
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

/*const items = [
	{
		name: "Cat info",
		description: "Some ifo about cat's food",
		color: "#64ACC8"
	},
	{
		name: "Cat 2 info",
		description: "Some information about cats treatments",
		color: "#7D85B1"
	},
	{
		name: "Dog info",
		description: "Some advertising for dog's food",
		color: "#CE7E78"
	}
]*/

const theme = createMuiTheme({});

const CarouselInfo = () => {
	const sm = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
	const classes = useStyles();
	const [catsFacts, setCatsFacts] = useState([]);
	const [dogsFacts, setDogsFacts] = useState([]);
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

	const getCatFacts = async () => {
		try {
			const response = await authorizedAxios.get('/static/cat-facts')
			setCatsFacts(response.data);
		} catch (error) {

		}
	}

	const getDogsFacts = async () => {
		try {
			const response = await authorizedAxios.get('/static/dog-facts')
			setDogsFacts(response.data);
		} catch (error) {

		}
	}

	useEffect(() => {
		getCatFacts().then();
		getDogsFacts().then();
	}, [])

	{/*TODO: carousel must be shown even if user is not register*/}

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
