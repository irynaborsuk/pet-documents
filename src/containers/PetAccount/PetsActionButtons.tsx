import React from 'react';
import {
	IconButton,
	makeStyles,
	Tooltip
} from '@material-ui/core';
import { DeleteForever, Edit, PersonAdd } from '@material-ui/icons';
import RemovePerson from '../../images/RemovePerson.svg';
import { createStyles, Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deletePetReduxThunk } from '../../store/pet/effects';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		actionIconStyles: {
			fill: theme.palette.secondary.dark
		}
	})
);

const PetsActionButtons = ({ petId }: any) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Tooltip title={'Add an owner'}>
				<IconButton>
					<PersonAdd
						className={classes.actionIconStyles}/>
				</IconButton>
			</Tooltip>
			<Tooltip title={'Remove an owner'}>
				<IconButton>
					<img src={RemovePerson} alt={'remove owner'}/>
				</IconButton>
			</Tooltip>
			<Tooltip title={'Edit pet profile'}>
				<IconButton
					onClick={() => history.push(`/edit-pet/${petId}`)}
				>
					<Edit className={classes.actionIconStyles}/>
				</IconButton>
			</Tooltip>
			<Tooltip title={'Delete pet profile'}>
				{/*<><DeletePet petId={petId}/></>*/}
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
								Warning! When you delete a pet's account, this action can not be undone.
								Do you want to continue?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
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
			</Tooltip>
		</div>
	);
};

export default PetsActionButtons;
