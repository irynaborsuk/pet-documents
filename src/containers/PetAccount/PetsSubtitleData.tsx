import React from 'react';
import { GENDER, PetDataResponse } from '../../types';
import femaleIcon from '../../images/femaleIcon.svg';
import maleIcon from '../../images/maleIcon.svg';
import { useSelector } from 'react-redux';
import { selectPet } from '../../store/pet/selectors';
import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		displayFlex: {
			display: 'flex',
			justifyContent: 'left',
			[theme.breakpoints.down('sm')]: {
				justifyContent: 'center',
			},
		},
		genderImg: {
			width: '1em',
			height: '1em',
			margin: '5px'
		}
	})
);

const PetsSubtitleData = () => {
	const classes = useStyles();
	const pet: PetDataResponse | null = useSelector(selectPet);

	if (!pet) {
		return <></>;
	}

	return (
		<div>
			<div>Breed: {pet.breed.name}</div>
			<div className={classes.displayFlex}>Gender:
				<img
					className={classes.genderImg}
					src={pet.gender === GENDER.FEMALE ? femaleIcon : maleIcon}
					alt={'gender icon'}
				/>
			</div>
			<div>Owners: {pet.owners.map((item, index) => {
				return (
					<span key={item.user_id}>
						{`${[item.given_name, item.family_name].join(' ')}${index === pet?.owners.length - 1 ? '' : ', '}`}
					</span>
				)
			})}
			</div>
		</div>
	);
};

export default PetsSubtitleData;
