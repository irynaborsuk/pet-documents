import React, { useState } from 'react';
import {
	Avatar, Checkbox, FormControlLabel,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
	Typography
} from '@material-ui/core';
import RemovePerson from '../../../images/RemovePerson.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { IRemoveAnOwnerId, PetDataResponse } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { selectPet } from '../../../store/pet/selectors';
import { removeAnOwnerReduxThunk } from '../../../store/owner-store/effects';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const RemoveAnOwner = ({ petId }: any) => {
	const [openRemoveOwner, setOpenRemoveOwner] = React.useState(false);
	const [selectedValue, setSelectedValue] = useState([]);
	const pet: PetDataResponse | null = useSelector(selectPet);
	const dispatch = useDispatch();

	const [checkBoxState, setCheckBoxState] = useState({ checked: false });

	const checkBoxHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckBoxState({ ...checkBoxState, [event.target.name]: event.target.checked });
	};

	const handleClickOpenRemoveOwner = () => {
		setOpenRemoveOwner(true)
	};
	const handleCloseRemoveOwner = () => {
		setOpenRemoveOwner(false)
	};

	const handleListItemClick = (value: any) => {
		setSelectedValue(value);
	};

	const initialValues: IRemoveAnOwnerId = {
		ownerId: ""
	}

	const validationSchema = Yup.object({
		ownerId: Yup.string()
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
				ownerId: values.ownerId
			}
			console.log(values.ownerId);
			dispatch(removeAnOwnerReduxThunk(petId, data));
			//handleCloseRemoveOwner();
		}
	})

	if (!pet) {
		return <></>;
	}

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

						{/*
						<List>
							{pet.owners.map((item) => (
								<ListItem
									button
									onClick={() => handleListItemClick([item.given_name, item.family_name].join(' '))}
									key={item.user_id}
								>
									<ListItemAvatar>
										<Avatar />
									</ListItemAvatar>
									<ListItemText
										//value={values.ownerId}
										primary={item.email}
									/>
								</ListItem>
							))}
						</List>
						*/}

						<List>
							{pet.owners.map((item) => (
								<ListItem
									button
									onClick={() => handleListItemClick([item.given_name, item.family_name].join(' '))}
									key={item.user_id}
								>
									<ListItemAvatar>
										<Avatar />
									</ListItemAvatar>
									<ListItemText
										//value={values.ownerId}
										primary={item.email}
									/>
								</ListItem>
							))}
						</List>

						<br />
						<Typography variant="h6">Selected: {selectedValue}</Typography>


						{/* TODO: delete by id, like delete for pet, use radio buttons or checkbox */}
						{/* TODO: make visible avatar photo */}


					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleCloseRemoveOwner}
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

export default RemoveAnOwner;
