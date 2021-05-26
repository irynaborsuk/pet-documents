import React, { useState } from 'react';
import {
	FormControl, FormControlLabel,
	IconButton, Radio, RadioGroup,
	Tooltip
} from '@material-ui/core';
import RemovePerson from '../../../images/RemovePerson.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { IOwnerData, IRemoveAnOwnerId, PetDataResponse } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { selectPet } from '../../../store/pet/selectors';
import { removeAnOwnerReduxThunk } from '../../../store/owner-store/effects';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const RemoveAnOwner = ({ petId }: any) => {
	const [openRemoveOwner, setOpenRemoveOwner] = useState(false);
	const [selectedValue, setSelectedValue] = useState([]);
	const pet: PetDataResponse | null = useSelector(selectPet);
	const dispatch = useDispatch();

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
		ownerId: ''
	}

	const validationSchema = Yup.object({
		ownerId: Yup.string().required()
	});

	const {
		handleSubmit,
		values,
		setFieldValue
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			const data = {
				ownerId: values.ownerId
			}
			console.log(values.ownerId);
			dispatch(removeAnOwnerReduxThunk(petId, data));
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

						<FormControl component="fieldset">
							<RadioGroup
								aria-label="removeAnOwner"
								name="removeAnOwner"
								value={values.ownerId}
								onChange={({ target: { value: newOwnerId } }) => {
									setFieldValue('ownerId', newOwnerId);
								}}
							>
								{pet.owners.map((item: IOwnerData) => (
									<FormControlLabel
										key={item.user_id}
										value={item.user_id}
										control={<Radio/>}
										label={item.email}
										onClick={() => handleListItemClick([item.given_name, item.family_name].join(' '))}
									/>
								))}
							</RadioGroup>
						</FormControl>

						<DialogTitle id="form-dialog-title">Selected: {selectedValue}</DialogTitle>

						<DialogContentText>
							Warning! This action cannot be undone after deleting the owner. Do you want to continue?
						</DialogContentText>

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
