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
	species: SPECIES | null,
	breed: string,
	gender: GENDER | null,
	dateOfBirth: string,
	colour?: string,
	notes?: string
}
