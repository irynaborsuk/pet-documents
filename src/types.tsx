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
	species: AutocompleteOption<SPECIES> | null, // if you got complex object as a type for some area - you need also add a | null (if the field gonna be empty)
	breed: AutocompleteOption<string> | null,
	gender: AutocompleteOption<GENDER> | null,
	dateOfBirth: string,
	colour?: string,
	notes?: string
}

export interface PetsResponse {
	vaccinations: Array<any>,
	owners: Array<string>,
	_id: string,
	name: string,
	colour: string,
	notes: string,
	species: number,
	breed: Breed,
	gender: number,
	dateOfBirth: string
}

export interface PetDataResponse {
	vaccinations: Array<any>,
	owners: Array<IOwnerData>,
	_id: string,
	name: string,
	colour: string,
	notes: string,
	species: number,
	breed: BreedId,
	gender: number,
	dateOfBirth: string
}

export interface IOwnerData {
	user_id: string,
	email: string,
	given_name: string,
	family_name: string
}

export interface AutocompleteOption<T> {
	label: string;
	value: T;
}

export interface Breed {
	_id: string;
	name: string;
}

export interface BreedId extends Breed {
	__v: number
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
