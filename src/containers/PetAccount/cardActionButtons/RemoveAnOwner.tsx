import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import RemovePerson from '../../../images/RemovePerson.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { IRemoveAnOwner } from '../../../types';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const RemoveAnOwner = ({ petId }: any) => {

	const [openRemoveOwner, setOpenRemoveOwner] = React.useState(false);

	const handleClickOpenRemoveOwner = () => {
		setOpenRemoveOwner(true)
	};
	const handleCloseRemoveOwner = () => {
		setOpenRemoveOwner(false)
	};

	const initialValues: IRemoveAnOwner = {
		ownerId: ''
	}

	const validationSchema = Yup.object({
		ownerId: Yup.string().required('Required')
	});

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		touched,
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			const data = {
				ownerId: values.ownerId
			}

			handleCloseRemoveOwner();
		}
	})

	return (
		<>
			<Tooltip title={'Remove an owner'}>
				<IconButton onClick={handleClickOpenRemoveOwner}>
					<img src={RemovePerson} alt={'remove owner'}/>
				</IconButton>
			</Tooltip>
			<Dialog open={openRemoveOwner} onClose={handleCloseRemoveOwner}
					aria-labelledby="form-dialog-title">
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Remove an owner</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Warning! This action cannot be undone after deleting the owner. Do you want to continue?
						</DialogContentText>

						{/* TODO: delete by id, like delete for pet, use radio buttons or checkbox */}

					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseRemoveOwner} color="primary">
							Cancel
						</Button>
						<Button onClick={handleCloseRemoveOwner} color="primary">
							Continue
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default RemoveAnOwner;
