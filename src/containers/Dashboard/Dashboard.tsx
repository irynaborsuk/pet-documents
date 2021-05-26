import React from 'react';
import CarouselInfo from '../CaruselInfo/CarouselInfo';
import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center'
		},
		carousel: {
			display: 'flex',
			margin: theme.spacing(1),
			width: '100%',
			maxWidth: '1000px'
		}
	}))

const Dashboard = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.carousel}>
				<CarouselInfo/>
			</div>
		</div>
	);
};

export default Dashboard;
