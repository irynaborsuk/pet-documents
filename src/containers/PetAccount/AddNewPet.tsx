import React, { useEffect } from 'react';
import {
	AutocompleteOption,
	GENDER,
	getGenderLabel,
	getSpeciesLabel,
	InitialPetData,
	SPECIES
} from '../../types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createStyles, FormControl, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../../UI/Button';
import { useHistory } from 'react-router';
import { getDogBreedsReduxThunk } from '../../store/dog-breeds/effects';
import { useDispatch, useSelector } from 'react-redux';
import { selectDogBreeds, selectIsDogBreedsLoaded } from '../../store/dog-breeds/selectors';
import { selectCatBreeds, selectIsCatBreedsLoaded } from '../../store/cat-breeds/selectors';
import { loadCatBreedsReduxThunk } from '../../store/cat-breeds/effects';
import authorizedAxios from '../../hooks/useAxiosInterceptors';

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
			justifyContent: 'space-between',
		},
		errorMessage: {
			color: theme.palette.error.main
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
	species: null,
	breed: null,
	gender: null,
	dateOfBirth: '',
	colour: '',
	notes: ''
}

const speciesOptions: AutocompleteOption<SPECIES>[] = [
	{ label: getSpeciesLabel[SPECIES.CAT], value: SPECIES.CAT },
	{ label: getSpeciesLabel[SPECIES.DOG], value: SPECIES.DOG }
]

const genderOptions: AutocompleteOption<GENDER>[] = [
	{ label: getGenderLabel[GENDER.MALE], value: GENDER.MALE },
	{ label: getGenderLabel[GENDER.FEMALE], value: GENDER.FEMALE }
]

const AddNewPet = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const dogBreeds = useSelector(selectDogBreeds);
	const isDogBreedsLoaded = useSelector(selectIsDogBreedsLoaded);
	const catBreeds = useSelector(selectCatBreeds);
	const isCatBreedsLoaded = useSelector(selectIsCatBreedsLoaded);

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		touched,
		setErrors,
		setStatus,
		setFieldTouched,
		setFieldValue,
		setValues,
		resetForm
	} = useFormik({
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string()
				.matches(/[a-zA-Z]/, 'Name must contain Latin letters.')
				.max(40, 'Must be 40 characters or less')
				.required('Required'),
			species: Yup.object()
				.nullable() // you need .nullable() if initialState has type of null (to show appropriate error massage at least)
				.required("Required"),
			breed: Yup.object()
				.nullable()
				.required('Required'),
			gender: Yup.object()
				.nullable()
				.required('Required'),
			dateOfBirth: Yup.string()
				.required('Required'),
			colour: Yup.string()
				.matches(/[a-zA-Z]/, 'Animal colour can not be a number, please use Latin letters instead.'),
			notes: Yup.string()
		}),
		onSubmit: async (values) => {
			const selectedSpecies: SPECIES = Number.parseInt(values.species?.value?.toString() || '');
			const selectedGender: GENDER = Number.parseInt(values.gender?.value?.toString() || '');
			const data = {
				name: values.name,
				species: selectedSpecies,
				breed: values.breed?.value,
				gender: selectedGender,
				dateOfBirth: values.dateOfBirth,
				colour: values.colour,
				notes: values.notes
			}
			await authorizedAxios.post('/pet/create', data)
				.then((response) => {
					console.log(response.data);
					{/*TODO: що далі з response.data) робити*/}
					resetForm();
				})
		}
	});

	useEffect(() => {
		if (values.species?.value === SPECIES.DOG && !isDogBreedsLoaded) {
			dispatch(getDogBreedsReduxThunk());
			return;
		}
		if (values.species?.value === SPECIES.CAT && !isCatBreedsLoaded) {
			dispatch(loadCatBreedsReduxThunk());
			return;
		}
	}, [values.species]);

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
				<Autocomplete
					value={values.species}
					onChange={(event, newValue: any) => {
						setFieldValue('species', newValue);
					}}
					options={speciesOptions}
					getOptionLabel={(option) => option.label}
					getOptionSelected={(option, value) => option.label === value.label}
					renderInput={(params) =>
						<TextField
							{...params}
							label="Species"
							variant="outlined"
							name="species"
							onBlur={handleBlur}
							value={values.species}
							error={!!(touched.species && errors.species)}
							helperText={errors.species}
						/>}
				/>
			</FormControl>


			<FormControl variant="outlined" className={classes.formControl}>
				<Autocomplete
					value={values.breed}
					onChange={(event, newValue: any) => {
						setFieldValue('breed', newValue);
					}}
					options={(+(values?.species ? values.species : '') === SPECIES.DOG ? dogBreeds : catBreeds).map(({_id, name}) => {
						return {
							label: name,
							value: _id
						}
					})}
					getOptionLabel={(option) => option.label}
					getOptionSelected={(option, value) => option.label === value.label}
					renderInput={(params) =>
						<TextField
							{...params}
							label="Pet Breed"
							variant="outlined"
							name="breed"
							onBlur={handleBlur}
							value={values.breed}
							error={!!(touched.breed && errors.breed)}
							helperText={errors.breed}
						/>}
				/>
			</FormControl>

			{/*TODO: Dog breed nas nno options - fix*/}
			{/*TODO: неактивне поле поки не вибраний species*/}
			{/*TODO: controlled and uncontrolled components / values*/}
			{/*TODO: add circular progress to breeds while it downloading if internet connection slow */}

			<FormControl variant="outlined" className={classes.formControl}>
				<Autocomplete
					value={values.gender}
					onChange={(event, newValue: any) => {
						setFieldValue('gender', newValue);
					}}
					options={genderOptions}
					getOptionLabel={(option) => option.label}
					getOptionSelected={(option, value) => option.label === value.label}
					renderInput={(params) =>
						<TextField
							{...params}
							label="Gender"
							variant="outlined"
							name="gender"
							onBlur={handleBlur}
							value={values.gender}
							error={!!(touched.gender && errors.gender)}
							helperText={errors.gender}
						/>}
				/>
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
				<div className={classes.buttonsGroup}>
					<Button
						name={'Reset'}
						type={'reset'}
						onClick={() => resetForm()}
						backgroundColor={'var(--color-basic-yellow)'}
						color={'var(--color-basic-grey)'}
						height={'56px'}
					/>
				</div>

				<div className={classes.buttonsGroup}>
					<Button
						name={'Cancel'}
						type={'button'}
						onClick={() => {
							history.push('/pet-account')
						}}
						backgroundColor={'var(--color-basic-grey)'}
						color={'var(--color-bright-red)'}
						height={'56px'}
						margin={'0 10px'}
					/>

					<Button
						name={'Create'}
						type={'submit'}
						backgroundColor={'var(--color-basic-green)'}
						color={'var(--color-basic-grey)'}
						height={'56px'}
					/>
				</div>
			</div>

		</form>

	);
};

export default AddNewPet;
