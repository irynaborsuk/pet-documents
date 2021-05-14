import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DeleteForever } from '@material-ui/icons';
import { IconButton, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { deletePetReduxThunk } from '../../store/pet-delete/effects';
import { PetDataResponse } from '../../types';
import { useSelector } from 'react-redux';
import { selectPet } from '../../store/pet/selectors';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		actionIconStyles: {
			fill: theme.palette.secondary.dark
		}
	})
);

export default function DeletePet() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<IconButton onClick={handleClickOpen}>
				<DeleteForever className={classes.actionIconStyles}/>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Delete pet's account?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Warning! When you delete a pet's account, this action cannot be undone.
						Do you want to continue?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={() => deletePetReduxThunk} color="primary" autoFocus>
						Continue
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
