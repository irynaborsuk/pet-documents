import React, { useEffect } from 'react';
import { GENDER, getGenderLabel, getSpeciesLabel, InitialPetData, ISpeciesOptions, SPECIES } from '../../types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createStyles, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../../UI/Button';
import axios from '../../hooks/useAxiosInterceptors';
import { useHistory } from 'react-router';
import { getDogBreedsReduxThunk } from '../../store/dog-breeds/effects';
import { useDispatch, useSelector } from 'react-redux';
import { selectDogBreeds, selectIsDogBreedsLoaded } from '../../store/dog-breeds/selectors';
import { selectCatBreeds, selectIsCatBreedsLoaded } from '../../store/cat-breeds/selectors';
import { loadCatBreedsReduxThunk } from '../../store/cat-breeds/effects';

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
	breed: '',
	gender: '',
	dateOfBirth: '',
	colour: '',
	notes: ''
}

const speciesOptions: ISpeciesOptions[] = [
	{ label: getSpeciesLabel[SPECIES.CAT], value: SPECIES.CAT },
	{ label: getSpeciesLabel[SPECIES.DOG], value: SPECIES.DOG }
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
		setValues
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
			const selectedSpecies: SPECIES = Number.parseInt(values.species?.value?.toString() || '');
			const data = {
				name: values.name,
				species: selectedSpecies,
				breed: values.breed,
				gender: values.gender,
				dateOfBirth: values.dateOfBirth,
				colour: values.colour,
				notes: values.notes
			}
			axios.post('/pet/create', data)
				.then((response) => {
					console.log(response.data);
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
				<InputLabel>Pet's Breed</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					name="breed"
					type="breed"
					label="Breed"
					onChange={handleChange}
					/*onChange={(event, newValue) => {
						setFieldValue("breed", newValue)
					}}*/
					onBlur={handleBlur}
					value={values.breed}
					error={!!(touched.breed && errors.breed)}
				>
					{/*TODO: Change Select to Autocomplete */}
					{/*TODO: виправити на onChange*/}
					{/*TODO: неактивне поле поки не вибраний species*/}
					{/*TODO: controlled and uncontrolled components / values*/}
					{/*TODO: add circular progress to breeds while it downloading if internet connection slow */}
					{(+(values?.species ? values.species : '') === SPECIES.DOG ? dogBreeds : catBreeds)
						.map((item) => <MenuItem key={item._id}>{item.name}</MenuItem>)}
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
