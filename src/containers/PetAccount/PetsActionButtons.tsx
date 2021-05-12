import React from 'react';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { DeleteForever, Edit, PersonAdd } from '@material-ui/icons';
import RemovePerson from '../../images/RemovePerson.svg';
import { createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		actionIconStyles: {
			fill: theme.palette.secondary.dark
		}
	})
);

const PetsActionButtons = () => {
	const classes = useStyles();

	return (
		<div>
			<Tooltip title={'Add an owner'}>
				<IconButton>
					<PersonAdd
						className={classes.actionIconStyles}/>
				</IconButton>
			</Tooltip>
			<Tooltip title={'Remove an owner'}>
				<IconButton aria-label="settings">
					<img src={RemovePerson} alt={'remove owner'}/>
				</IconButton>
			</Tooltip>
			<Tooltip title={'Edit pet profile'}>
				<IconButton aria-label="settings">
					<Edit
						className={classes.actionIconStyles}/>
				</IconButton>
			</Tooltip>
			<Tooltip title={'Delete pet profile'}>
				<IconButton aria-label="settings">
					<DeleteForever
						className={classes.actionIconStyles}/>
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default PetsActionButtons;
