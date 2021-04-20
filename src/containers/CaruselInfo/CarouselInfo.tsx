import React, { useEffect, useState } from 'react';
import { Button, Card, createStyles, Paper, styled, useMediaQuery } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import axios from '../../hooks/axios';
import { useAuth0 } from '@auth0/auth0-react';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { CarouselStyleProps } from '../../types';

// for now, this items will be hardcoded
// in the future, if it will be necessary - may replace for dynamic cards which the admin of the site can update and delete

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
		}
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
	const { getAccessTokenSilently } = useAuth0();
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
			const response = await axios.get('/static/cat-facts', {
				headers: {
					Authorization: `Bearer ${await getAccessTokenSilently()}`
				}
			})
			setCatsFacts(response.data);
		} catch (error) {

		}
	}

	const getDogsFacts = async () => {
		try {
			const response = await axios.get('/static/dog-facts', {
				headers: {
					Authorization: `Bearer ${await getAccessTokenSilently()}`
				}
			})
			setDogsFacts(response.data);
		} catch (error) {

		}
	}

	useEffect(() => {
		getCatFacts().then();
		getDogsFacts().then();
	}, [])

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
						<div style={{display: 'flex', color: 'var(--color-basic-green)'}}>Interesting Fact!</div>
						<div style={{display: 'flex'}}>{item.name}</div>
					</Card>
				})
			}
		</Carousel>
	);
};

export default CarouselInfo;
