import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PetsIcon from '@material-ui/icons/Pets';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '250px'
		},
		homeButton: {
			display: 'flex',
			justifyContent: 'center'
		},
		svgStyled: {
			fill: theme.palette.primary.main
		}
	}))

const NavigationList = () => {
	const classes = useStyles();
	const history = useHistory();
	return (
		<List className={classes.root}>
			<ListItem
				className={classes.homeButton}
				button
				onClick={() => {
					history.push('/')
				}}
			>
				<ListItemIcon>
					<HomeIcon className={classes.svgStyled}/>
				</ListItemIcon>
			</ListItem>

			<ListItem
				button
				onClick={() => {
					history.push('/pet-account')
				}}
			>
				<ListItemIcon>
					<PetsIcon className={classes.svgStyled}/>
				</ListItemIcon>
				<ListItemText primary={'Pet Account'}/>
			</ListItem>
		</List>
	);
};

export default NavigationList;
