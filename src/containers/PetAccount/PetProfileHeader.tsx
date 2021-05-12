import React from 'react';
import { Avatar, Card, CardHeader, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { BreedId, GENDER, SPECIES } from '../../types';
import catIcon from '../../images/catIcon512.png';
import dogIcon from '../../images/dogIcon512.png';
import femaleIcon from '../../images/femaleIcon.svg';
import maleIcon from '../../images/maleIcon.svg';
import { DeleteForever, Edit, PersonAdd } from '@material-ui/icons';
import RemovePerson from '../../images/RemovePerson.svg';
import { createStyles, Theme } from '@material-ui/core/styles';

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
			width: theme.spacing(10),
			height: theme.spacing(10)
		},
		displayFlex: {
			display: 'flex'
		},
		displayFlexColumn: {
			display: 'flex',
			flexDirection: 'column'
		},
		genderImg: {
			width: '1em',
			height: '1em',
			margin: '5px'
		},
		typographyAdditionInfo: {
			display: 'flex'
		},
		actionIconStyles: {
			fill: theme.palette.secondary.dark
		}
	})
);

const PetProfileHeader = () => {

	const classes = useStyles();

	return (
		<Card>
		</Card>
	);
};

export default PetProfileHeader;
