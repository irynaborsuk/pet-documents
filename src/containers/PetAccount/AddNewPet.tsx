import React from 'react';
import { InitialPetData } from '../../types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddNewPet = () => {

	const initialValues: InitialPetData = {
		name: '',
		species: 0,
		breed: '',
		gender: 0,
		dateOfBirth: '',
		colour: '',
		notes: ''
	}

	{/*TODO: продумати і зробити кращі фільтри для валідації полів*/}

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string()
				.max(15, 'Must be 15 characters or less')
				.required('Required'),
			species: Yup.number()
				.required('Required'),
			breed: Yup.string()
				.max(15, 'Must be 15 characters or less')
				.required('Required'),
			gender: Yup.number()
				.required('Required'),
			dateOfBirth: Yup.string()
				.required('Required'),
			colour: Yup.string()
				.required('Required'),
			notes: Yup.string()
		}),
		onSubmit: values => {
			// request to server to add the pet
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<div>
			
		</div>
	);
};

export default AddNewPet;
