import { DateTime } from 'luxon';

export const calcDate = (date1: DateTime, date2: string) => {
	const diff = date1.diff(DateTime.fromISO(date2), [
		"years",
		"month",
	])

	return `Age: ${diff.toFormat("y' year(s)', M' mouth(s)'")}`;
}
