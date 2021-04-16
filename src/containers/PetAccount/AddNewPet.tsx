import React from 'react';
import { GENDER, getGenderLabel, getSpeciesLabel, InitialPetData, SPECIES } from '../../types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createStyles, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../../UI/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#008080',
		},
	},
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		formControl: {
			display: 'flex',
			margin: theme.spacing(1),
			width: '100%',
			maxWidth: '900px',
		},
		buttonsGroup: {
			display: 'flex',
			justifyContent: 'space-between'
		},
		errorMessage: {
			color: '#ff0000'
		}
	})
)

const AddNewPet = () => {
	const classes = useStyles();

	const initialValues: InitialPetData = {
		name: '',
		species: null,
		breed: '',
		gender: null,
		dateOfBirth: '',
		colour: '',
		notes: ''
	}

	const formik = useFormik({
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
		onSubmit: values => {
			// request to server to add the pet
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<ThemeProvider theme={theme}>
		<form onSubmit={formik.handleSubmit} className={classes.form}>
			<FormControl className={classes.formControl}>
				<TextField
					label="Pet's Name"
					variant="outlined"
					id="name"
					name="name"
					type="name"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
					error={!!(formik.touched.name && formik.errors.name)}
				/>
				{formik.touched.name && formik.errors.name ? (
					<div className={classes.errorMessage}>{formik.errors.name}</div>
				) : null}
			</FormControl>

			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel>Species</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						name="species"
						type="species"
						label="Species"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.species}
						error={!!(formik.touched.species && formik.errors.species)}
					>
						<MenuItem value={SPECIES.CAT}>{<>{getSpeciesLabel[SPECIES.CAT]}</>}</MenuItem>
						<MenuItem value={SPECIES.DOG}>{<>{getSpeciesLabel[SPECIES.DOG]}</>}</MenuItem>
					</Select>
				{formik.touched.species && formik.errors.species ? (
					<div className={classes.errorMessage}>{formik.errors.species}</div>
				) : null}
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					label="Pet's Breed"
					variant="outlined"
					id="breed"
					name="breed"
					type="breed"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.breed}
					error={!!(formik.touched.breed && formik.errors.breed)}
				/>
				{formik.touched.breed && formik.errors.breed ? (
					<div className={classes.errorMessage}>{formik.errors.breed}</div>
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
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.gender}
					error={!!(formik.touched.gender && formik.errors.gender)}
				>
					<MenuItem value={GENDER.MALE}>{<>{getGenderLabel[GENDER.MALE]}</>}</MenuItem>
					<MenuItem value={GENDER.FEMALE}>{<>{getGenderLabel[GENDER.FEMALE]}</>}</MenuItem>
				</Select>
				{formik.touched.gender && formik.errors.gender ? (
					<div className={classes.errorMessage}>{formik.errors.gender}</div>
				) : null}
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					label="Pet's date of birth"
					InputLabelProps={{
						shrink: true,
					}}
					variant="outlined"
					id="dateOfBirth"
					name="dateOfBirth"
					type="date"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.dateOfBirth}
					error={!!(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
				/>
				{formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
					<div className={classes.errorMessage}>{formik.errors.dateOfBirth}</div>
				) : null}
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					label="Animal Colour"
					variant="outlined"
					id="colour"
					name="colour"
					type="colour"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.colour}
					error={!!(formik.touched.colour && formik.errors.colour)}
				/>
				{formik.touched.colour && formik.errors.colour ? (
					<div className={classes.errorMessage}>{formik.errors.colour}</div>
				) : null}
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					label="Special notes about animal"
					variant="outlined"
					multiline={true}
					rowsMax={5}
					id="notes"
					name="notes"
					type="notes"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.notes}
					error={!!(formik.touched.notes && formik.errors.notes)}
				/>
				{formik.touched.notes && formik.errors.notes ? (
					<div className={classes.errorMessage}>{formik.errors.notes}</div>
				) : null}
			</FormControl>

			<div className={[classes.formControl, classes.buttonsGroup].join(' ')}>
				<Button
					name={'Cancel'}
					backgroundColor={'#eee'}
					color={'#ff0000'}
					height={'56px'}
					width={'45%'}
				/>
				<Button
					name={'Create'}
					backgroundColor={'teal'}
					color={'#eee'}
					height={'56px'}
					width={'46%'}
				/>
			</div>

		</form>
		</ThemeProvider>
	);
};

export default AddNewPet;
