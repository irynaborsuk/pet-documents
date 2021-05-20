import React, { useEffect } from 'react';
import {
	AutocompleteOption,
	GENDER,
	getGenderLabel,
	getSpeciesLabel,
	InitialPetData, PetDataResponse,
	SPECIES
} from '../../types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CircularProgress, createStyles, FormControl, InputAdornment, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../../UI/Button';
import { useHistory, useParams } from 'react-router';
import { getDogBreedsReduxThunk } from '../../store/dog-breeds/effects';
import { useDispatch, useSelector } from 'react-redux';
import { selectDogBreeds, selectIsDogBreedsLoaded, selectIsDogBreedsLoading } from '../../store/dog-breeds/selectors';
import { selectCatBreeds, selectIsCatBreedsLoaded, selectIsCatBreedsLoading } from '../../store/cat-breeds/selectors';
import { loadCatBreedsReduxThunk } from '../../store/cat-breeds/effects';
import authorizedAxios from '../../hooks/useAxiosInterceptors';
import { selectPet } from '../../store/pet/selectors';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider, Picker } from '@material-ui/pickers';
import LocalizationProvider from '@material-ui/lab';
import { DateTime } from 'luxon';
import LuxonUtils from '@date-io/luxon';
import { Today } from '@material-ui/icons';


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
		}
	})
)

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
	const { id } = useParams<{ id: string }>();
	const pet: PetDataResponse | null = useSelector(selectPet);
	const dispatch = useDispatch();
	const dogBreeds = useSelector(selectDogBreeds);
	const isDogBreedsLoaded = useSelector(selectIsDogBreedsLoaded);
	const catBreeds = useSelector(selectCatBreeds);
	const isCatBreedsLoaded = useSelector(selectIsCatBreedsLoaded);
	const isCatBreedsLoading = useSelector(selectIsCatBreedsLoading);
	const isDogBreedsLoading = useSelector(selectIsDogBreedsLoading);

	const editMode: boolean = !!id;

	const initialValues: InitialPetData | any = editMode ? {
		name: pet?.name || '',
		species: speciesOptions.find(({ value }) => value === pet?.species) || null,
		breed: null,
		gender: genderOptions.find(({ value }) => value === pet?.gender) || null,
		dateOfBirth: pet?.dateOfBirth || null,
		colour: pet?.colour || '',
		notes: pet?.notes || ''
	} : {
		name: '',
		species: null,
		breed: null,
		gender: null,
		dateOfBirth: null,
		colour: '',
		notes: ''
	}

	const validationSchema = Yup.object({
		name: Yup.string()
			.matches(/[a-zA-Z]/, 'Name must contain Latin letters.')
			.max(40, 'Must be 40 characters or less')
			.required('Required'),
		species: Yup.object()
			.nullable() // you need .nullable() if initialState has type of null (to show appropriate error massage at least)
			.required('Required'),
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
	});

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		touched,
		setFieldValue,
		resetForm
	} = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: (ev) => {
			return !editMode ? createPet(ev) : updatePet(id, ev)
		}
	});

	const createPet = async (values: InitialPetData) => {
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
				{/*TODO: що далі з response.data) робити*/
				}
				resetForm();
				history.push('/pet-account');
			})
	}

	const updatePet = (id: string, values: InitialPetData) => {

	}

	useEffect(() => {
		const selectedSpecies = values.species?.value?.toString() ?? '';
		if (Number.parseInt(selectedSpecies) === SPECIES.DOG && !isDogBreedsLoaded) {
			dispatch(getDogBreedsReduxThunk());
			return;
		}
		if (Number.parseInt(selectedSpecies) === SPECIES.CAT && !isCatBreedsLoaded) {
			dispatch(loadCatBreedsReduxThunk());
			return;
		}
	}, [values.species]);

	return (

		<form onSubmit={handleSubmit} className={classes.form}>
			{editMode ? <h3>Edit pet's account</h3> : null}
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
				helperText={touched.name && errors.name}
			/>

			<FormControl variant="outlined" className={classes.formControl}>
				<Autocomplete
					value={values.species}
					onChange={(event, newValue: any) => {
						setFieldValue('species', newValue);
						setFieldValue('breed', null);
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
							helperText={touched.species && errors.species}
						/>}
				/>
			</FormControl>

			<FormControl variant="outlined" className={classes.formControl}>
				<Autocomplete
					value={values.breed}
					onChange={(event, newValue: any) => {
						setFieldValue('breed', newValue);
					}}
					options={(+(values?.species ? values.species.value : '') === SPECIES.DOG ? dogBreeds : catBreeds)
						.map(({ _id, name }) => {
							return {
								label: name,
								value: _id
							}
						})}
					getOptionLabel={(option) => option.label}
					renderInput={(params) =>
						<TextField
							{...params} // every time you need necessary rewrite params to the additions
							label="Pet Breed"
							variant="outlined"
							name="breed"
							onBlur={handleBlur}
							value={values.breed}
							error={!!(touched.breed && errors.breed)}
							helperText={touched.breed && errors.breed}
							InputProps={{
								...params.InputProps, // every time you need necessary rewrite params to the additions
								endAdornment: (
									<>
										{params.InputProps.endAdornment}
										{isCatBreedsLoading || isDogBreedsLoading ? <div>
											<InputAdornment position="end">
												<CircularProgress/>
											</InputAdornment>
										</div> : <></>}
									</>
								)
							}}
						/>}
				/>
			</FormControl>

			<FormControl variant="outlined" className={classes.formControl}>
				<Autocomplete
					value={values.gender}
					onChange={(event, newValue: any) => {
						setFieldValue('gender', newValue);
					}}
					options={genderOptions}
					getOptionLabel={(option) => option.label}
					renderInput={(params) =>
						<TextField
							{...params}
							label="Gender"
							variant="outlined"
							name="gender"
							onBlur={handleBlur}
							value={values.gender}
							error={!!(touched.gender && errors.gender)}
							helperText={touched.gender && errors.gender}
						/>}
				/>
			</FormControl>

			<DatePicker
				className={classes.formControl}
				showTodayButton
				label="Pet's date of birth"
				format="dd/MM/yyyy"
				margin="normal"
				inputVariant="outlined"
				id="date-picker-dialog"
				name="dateOfBirth"
				onChange={(newDate) => {
					setFieldValue('dateOfBirth', newDate);
				}}
				value={values.dateOfBirth}
				error={!!(touched.dateOfBirth && errors.dateOfBirth)}
				helperText={touched.dateOfBirth && errors.dateOfBirth}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Today/>
						</InputAdornment>
					)
				}}
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
				helperText={touched.colour && errors.colour}
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
				helperText={touched.notes && errors.notes}
			/>

			<div className={[classes.formControl, classes.buttonsGroup].join(' ')}>
				<div className={classes.buttonsGroup}>
					<Button
						name={'Reset'}
						type={'reset'}
						onClick={() => resetForm()}
						backgroundColor={'var(--color-basic-yellow-light)'}
						color={'var(--color-black-rgba)'}
						height={'56px'}
						padding={'0 20px'}
					/>
				</div>

				<div className={classes.buttonsGroup}>
					<Button
						name={'Cancel'}
						type={'button'}
						onClick={() => {
							editMode ?
								history.push(`/pet/${pet?._id}`) :
								history.push('/pet-account')
						}}
						backgroundColor={'var(--color-basic-grey)'}
						color={'var(--color-bright-red)'}
						height={'56px'}
						margin={'0 10px'}
						padding={'0 20px'}
					/>
					<Button
						name={!editMode ? 'Create' : 'Update'}
						type={'submit'}
						backgroundColor={'var(--color-basic-green)'}
						color={'var(--color-basic-grey)'}
						height={'56px'}
						padding={'0 20px'}
					/>
				</div>
			</div>
		</form>

	);
};

export default AddNewPet;
