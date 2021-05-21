import { DateTime } from 'luxon';
import { AutocompleteOption, Breed } from '../types';

export const calcDate = (date1: DateTime, date2: string) => {
	const diff = date1.diff(DateTime.fromISO(date2), [
		'years',
		'month'
	])

	return `${diff.toFormat('y\' year(s)\', M\' mouth(s)\'')}`;
}

export const mapBreedsToAutoCompleteOptions = (breeds: Breed[]): AutocompleteOption<string>[] => {
	return breeds.map(({ _id, name }) => {
		return { label: name, value: _id }
	});
}
