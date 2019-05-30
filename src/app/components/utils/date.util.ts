const DAYS_IN_WEEK: number = 7;

export interface WeekdayDates {
	sunday: Date;
	monday: Date;
	tuesday: Date;
	wednesday: Date;
	thursday: Date;
	friday: Date;
	saturday: Date;
}

export function getWeekdayDates(date: Date): Date[] {

	const sundays: Date[] = [];

	date = copyDateUpToDay(date);
    date.setDate(date.getDate() - date.getDay());
    
    sundays[0] = date;

    date = copyDateUpToDay(date);
    date.setDate(date.getDate() + DAYS_IN_WEEK);

    sundays[1] = date;

    return sundays;

}

export function getNextWeekdayDates(date: Date): Date[] {
	date = copyDateUpToDay(date);
	date.setDate(date.getDate() + DAYS_IN_WEEK);

	return getWeekdayDates(date);
}

export function getPreviousWeekdayDates(date: Date): Date[] {
	date = copyDateUpToDay(date);
	date.setDate(date.getDate() - DAYS_IN_WEEK);

	return getWeekdayDates(date);
}

export function copyDateUpToDay(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function copyDateUpToMinute(date: Date, hours?: number, minutes?: number): Date {
	return new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		hours != null ? hours : date.getHours(),
		minutes != null ? minutes : date.getMinutes());
}
