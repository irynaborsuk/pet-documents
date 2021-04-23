import React, { useEffect, useState } from 'react';
import { GENDER, getGenderLabel, getSpeciesLabel, InitialPetData, SPECIES } from '../../types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createStyles, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../../UI/Button';
import axios from '../../hooks/useAxiosInterceptors';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		formControl: {
			display: 'flex',
			margin: theme.spacing(1),
			width: '100%',
			maxWidth: '900px'
		},
		buttonsGroup: {
			display: 'flex',
			justifyContent: 'space-between'
		},
		errorMessage: {
			color: theme.palette.error.main,
		},
		selectedField: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'baseline'
		}
	})
)

const initialValues: InitialPetData = {
	name: '',
	species: '',
	breed: '',
	gender: '',
	dateOfBirth: '',
	colour: '',
	notes: ''
}

const AddNewPet = () => {
	const classes = useStyles();
	const history = useHistory();
	const { getAccessTokenSilently } = useAuth0();
	const [catsBreeds, setCatsBreeds] = useState([]);
	const [dogsBreeds, setDogsBreeds] = useState([]);

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		touched,
	} = useFormik({
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string()
				.matches(/[a-zA-Z]/, 'Name must contain Latin letters.')
				.max(40, 'Must be 40 characters or less')
				.required('Required'),
			species: Yup.number()
				.required('Required'),
			breed: Yup.string()
				.matches(/[a-zA-Z]/, 'Breed must contain Latin letters.')
				.max(40, 'Must be 40 characters or less')
				.required('Required'),
			gender: Yup.number()
				.required('Required'),
			dateOfBirth: Yup.string()
				.required('Required'),
			colour: Yup.string()
				.matches(/[a-zA-Z]/, 'Animal colour can not be a number, please use Latin letters instead.'),
			notes: Yup.string()
		}),
		onSubmit: async (values) => {
			axios.post('/pet/create', {
				name: values.name,
				species: values.species,
				breed: values.breed,
				gender: values.gender,
				dateOfBirth: values.dateOfBirth,
				colour: values.colour,
				notes: values.notes
			})
				.then((response) => {
					console.log(response.data);
				})
		}
	});

	const getCatsBreeds = async () => {
		const response = await axios.get('/static/cat-breeds');
		setCatsBreeds(response.data);
		console.log(response.data);
	}

	const getDogsBreeds = async () => {
		const response = await axios.get('/static/dog-breeds');
		setDogsBreeds(response.data);
		console.log(response.data);
	}

	useEffect(() => {
		getCatsBreeds().then();
	}, [SPECIES.CAT])

	useEffect(() => {
		getDogsBreeds().then();
	}, [SPECIES.DOG])

	return (

			<form onSubmit={handleSubmit} className={classes.form}>
				<TextField
					className={classes.formControl}
					label="Pet's Name"
					variant="outlined"
					id="name"
					name="name"
					type="name"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.name}
					error={!!(touched.name && errors.name)}
					helperText={errors.name}
				/>

				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel>Species</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						name="species"
						type="species"
						label="Species"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.species}
						error={!!(touched.species && errors.species)}
					>
						<MenuItem value={SPECIES.CAT}>{<>{getSpeciesLabel[SPECIES.CAT]}</>}</MenuItem>
						<MenuItem value={SPECIES.DOG}>{<>{getSpeciesLabel[SPECIES.DOG]}</>}</MenuItem>
					</Select>
					{touched.species && errors.species ? (
						<div className={classes.errorMessage}>{errors.species}</div>
					) : null}
				</FormControl>

				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel>Pet's Breed</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						name="breed"
						type="breed"
						label="Breed"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.breed}
						error={!!(touched.breed && errors.breed)}
					>

					</Select>
					{touched.breed && errors.breed ? (
						<div className={classes.errorMessage}>{errors.breed}</div>
					) : null}
				</FormControl>

				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel>Gender</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						name="gender"
						type="gender"
						label="Gender"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.gender}
						error={!!(touched.gender && errors.gender)}
					>
						<MenuItem value={GENDER.MALE}>{<>{getGenderLabel[GENDER.MALE]}</>}</MenuItem>
						<MenuItem value={GENDER.FEMALE}>{<>{getGenderLabel[GENDER.FEMALE]}</>}</MenuItem>
					</Select>
					{touched.gender && errors.gender ? (
						<div className={classes.errorMessage}>{errors.gender}</div>
					) : null}
				</FormControl>

				<TextField
					className={classes.formControl}
					label="Pet's date of birth"
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
					id="dateOfBirth"
					name="dateOfBirth"
					type="date"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.dateOfBirth}
					error={!!(touched.dateOfBirth && errors.dateOfBirth)}
					helperText={errors.dateOfBirth}
				/>
				<TextField
					className={classes.formControl}
					label="Animal Colour"
					variant="outlined"
					id="colour"
					name="colour"
					type="colour"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.colour}
					error={!!(touched.colour && errors.colour)}
					helperText={errors.colour}
				/>
				<TextField
					className={classes.formControl}
					label="Special notes about animal"
					variant="outlined"
					multiline={true}
					rowsMax={5}
					id="notes"
					name="notes"
					type="notes"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.notes}
					error={!!(touched.notes && errors.notes)}
					helperText={errors.notes}
				/>

				<div className={[classes.formControl, classes.buttonsGroup].join(' ')}>
					<Button
						name={'Cancel'}
						type={'button'}
						onClick={() => {
							history.push('/pet-account')
						}}
						backgroundColor={'var(--color-basic-grey)'}
						color={'var(--color-bright-red)'}
						height={'56px'}
						width={'45%'}
					/>
					<Button
						name={'Create'}
						type={'submit'}
						backgroundColor={'var(--color-basic-green)'}
						color={'var(--color-basic-grey)'}
						height={'56px'}
						width={'46%'}
					/>
				</div>

			</form>

	);
};

export default AddNewPet;
