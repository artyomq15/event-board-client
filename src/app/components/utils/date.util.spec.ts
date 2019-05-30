import * as DateUtil from './date.util';

describe('Date Util', () => {
    const date = new Date(2018, 9, 24);

    let expected: DateUtil.WeekdayDates;

    beforeEach(() => {
        expected = {
            sunday: null,
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
            saturday: null,
        };
    });


    it('#getWeekdayDates', () => {
        const dates: DateUtil.WeekdayDates = DateUtil.getWeekdayDates(date);
        const sunday = new Date(2018, 9, 21);

        fillExpectedDatesFromSunday(expected, sunday);
        expect(dates).toEqual(expected);

    });

    it('#getNextWeekdayDates', () => {
        const dates: DateUtil.WeekdayDates = DateUtil.getNextWeekdayDates(date);
        const sunday = new Date(2018, 9, 28);

        fillExpectedDatesFromSunday(expected, sunday);
        expect(dates).toEqual(expected);
    });

    it('#getPreviousWeekdayDates', () => {
        const dates: DateUtil.WeekdayDates = DateUtil.getPreviousWeekdayDates(date);
        const sunday = new Date(2018, 9, 14);

        fillExpectedDatesFromSunday(expected, sunday);
        expect(dates).toEqual(expected);
    });

    it('#copyDateUpToDay', () => {
        const dateCopy = DateUtil.copyDateUpToDay(date);

        expect(dateCopy).toEqual(date);
    });

    it('#copyDateUpToMinute with minutes', () => {
        const expectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0);
        const dateCopy = DateUtil.copyDateUpToMinute(date, 10, 0);

        expect(dateCopy).toEqual(expectedDate);
    });

    it('#copyDateUpToMinute without minutes', () => {
        const dateCopy = DateUtil.copyDateUpToDay(date);

        expect(dateCopy).toEqual(date);
    });
});

function fillExpectedDatesFromSunday(expected: DateUtil.WeekdayDates, sunday: Date) {
    for (const day of Object.keys(expected)) {
        expected[day] = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
        sunday.setDate(sunday.getDate() + 1);
    }
}
