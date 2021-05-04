import React from 'react';

export enum SPECIES {
	CAT,
	DOG,
}

export const getSpeciesLabel = {
	[SPECIES.CAT]: 'Cat',
	[SPECIES.DOG]: 'Dog'
}

export enum GENDER {
	MALE,
	FEMALE
}

export const getGenderLabel = {
	[GENDER.MALE]: 'Male',
	[GENDER.FEMALE]: 'Female'
}

export interface InitialPetData {
	name: string,
	species: {
		label: string;
		value: SPECIES | string | null;
	} | null, // if you got complex object as a type for some area - you need also add a | null (if the field gonna be empty)
	breed: string,
	gender: GENDER | '',
	dateOfBirth: string,
	colour?: string,
	notes?: string
}

export interface Breed {
	_id: string;
	name: string;
}

export interface CarouselStyleProps {
	className: string,
	style: React.CSSProperties
}


export interface AppState<T> {
	isLoading: boolean;
	data: T;
	errorMessage: string;
}

export interface ISpeciesOptions {
	label: string;
	value: SPECIES;
}
