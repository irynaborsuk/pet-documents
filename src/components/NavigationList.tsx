import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PetsIcon from '@material-ui/icons/Pets';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		homeButton: {
			display: 'flex',
			justifyContent: 'center'
		}
	}))

const NavigationList = () => {
	const classes = useStyles();
	const history = useHistory();
	return (
		<List>
			<ListItem
				className={classes.homeButton}
				button
				onClick={() => {
					history.push('/')
				}}
			>
				<ListItemIcon><HomeIcon/></ListItemIcon>
			</ListItem>

			<ListItem
				button
				onClick={() => {
					history.push('/pet-account')
				}}
			>
				<ListItemIcon><PetsIcon/></ListItemIcon>
				<ListItemText primary={'Pet Account'}/>
			</ListItem>
		</List>
	);
};

export default NavigationList;
