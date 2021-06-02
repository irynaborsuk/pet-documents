import React from 'react';
import { useDispatch } from 'react-redux';
import { IAddAnOwner } from '../../../types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addAnOwnerReduxThunk } from '../../../store/owner-store/effects';
import { IconButton, makeStyles, TextField, Tooltip } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { createStyles, Theme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { loadPetReduxThunk } from '../../../store/pet/effects';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		actionIconStyles: {
			fill: theme.palette.secondary.dark
		}
	})
);

const AddAnOwner = ({ petId }: any) => {
	const classes = useStyles();
	const [openAddOwner, setOpenAddOwner] = React.useState(false);
	const dispatch = useDispatch();
	const snackBar = useSnackbar();

	const handleClickOpenAddOwner = () => {
		setOpenAddOwner(true)
	};
	const handleCloseAddOwner = () => {
		setOpenAddOwner(false)
	};

	const initialValues: IAddAnOwner = {
		ownerEmail: ''
	}

	const validationSchema = Yup.object({
		ownerEmail: Yup.string().email('Invalid email address').required('Required')
	});

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		touched,
		resetForm
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			const data = {
				ownerEmail: values.ownerEmail
			}
			dispatch(addAnOwnerReduxThunk(petId, data, snackBar));
			dispatch(loadPetReduxThunk(petId, snackBar));
			handleCloseAddOwner();
		}
	})

	return (
		<>
			<Tooltip title={'Add an owner'}>
				<IconButton onClick={handleClickOpenAddOwner}>
					<PersonAdd
						className={classes.actionIconStyles}/>
				</IconButton>
			</Tooltip>
			<Dialog open={openAddOwner} onClose={handleCloseAddOwner} aria-labelledby="form-dialog-title">
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Add an owner</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To add another owner to this pet, please enter your email address here.
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							label="Enter your email"
							id="ownerEmail"
							name="ownerEmail"
							type="email"
							fullWidth
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.ownerEmail}
							error={!!(touched.ownerEmail && errors.ownerEmail)}
							helperText={touched.ownerEmail && errors.ownerEmail}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								resetForm();
								handleCloseAddOwner()
							}}
							color="primary">
							Cancel
						</Button>
						<Button
							type="submit"
							color="primary">
							Continue
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default AddAnOwner;
