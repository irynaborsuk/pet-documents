import React from 'react';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { deletePetReduxThunk } from '../../../store/pet/effects';
import { createStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		actionIconStyles: {
			fill: theme.palette.secondary.dark
		}
	})
);

const DeletePet = ({ petId }: any) => {
	const classes = useStyles();
	const [openDeleteButton, setOpenDeleteButton] = React.useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleClickOpenDeleteButton = () => {
		setOpenDeleteButton(true)
	};
	const handleCloseDeleteButton = () => {
		setOpenDeleteButton(false)
	};

	return (
		<>
			<Tooltip title={'Delete pet profile'}>
				<IconButton onClick={handleClickOpenDeleteButton}>
					<DeleteForever className={classes.actionIconStyles}/>
				</IconButton>
			</Tooltip>
			<Dialog
				open={openDeleteButton}
				onClose={handleCloseDeleteButton}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Delete pet\'s account?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Warning! When you delete a pet's account, this action can not be undone.
						Do you want to continue?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDeleteButton} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => dispatch(deletePetReduxThunk(petId, history))}
						color="primary" autoFocus>
						Continue
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DeletePet;
