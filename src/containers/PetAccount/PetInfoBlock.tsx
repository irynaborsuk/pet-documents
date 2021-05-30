import React from 'react';
import { Card, CardContent, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import { calcDate } from '../../utils/formatters';
import { createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		typographyAdditionInfo: {
			display: 'flex'
		},
		textStyles: {
			color: theme.palette.secondary.dark
		},
		petPropertiesStyles: {
			paddingLeft: theme.spacing(1)
		}
	})
);

interface PetInfo {
	dateOfBirth: string,
	colour: string,
	notes: any
}

const PetInfoBlock = (
	{
		dateOfBirth,
		colour,
		notes
	}: PetInfo) => {
	const classes = useStyles();
	const currentTime = DateTime.local();

	return (
		<Card>
			<CardHeader
				title={'Pet\'s info block'}
			/>
			<CardContent>
				<Grid item>
					<Typography className={classes.typographyAdditionInfo} variant="subtitle1">
						<b className={classes.textStyles}>Date of birth:</b>
					</Typography>
					<Typography variant="body2" className={classes.petPropertiesStyles}>
						{DateTime.fromISO(dateOfBirth).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
					</Typography>
				</Grid>
				<Grid item>
					<Typography className={classes.typographyAdditionInfo} variant="subtitle1">
						<b className={classes.textStyles}>Age:</b>
					</Typography>
					<Typography variant="body2" className={classes.petPropertiesStyles}>
						{calcDate(currentTime, dateOfBirth)}
					</Typography>
				</Grid>
				<Grid item>
					<Typography className={classes.typographyAdditionInfo} variant="subtitle1">
						<b className={classes.textStyles}>Colour:</b>
					</Typography>
					<Typography variant="body2" className={classes.petPropertiesStyles}>
						{colour}
					</Typography>
				</Grid>
				<Grid item>
					<Typography className={classes.typographyAdditionInfo} variant="subtitle1">
						{notes ? <b className={classes.textStyles}>Notes: </b> : null}
					</Typography>
					<Typography variant="body2" className={classes.petPropertiesStyles}>
						{notes ? <>{notes}</> : null}
					</Typography>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default PetInfoBlock;
