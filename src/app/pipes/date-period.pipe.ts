import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatePeriod } from '../store/domain/interfaces';

@Pipe({
	name: 'datePeriod'
})
export class DatePeriodPipe implements PipeTransform {

	constructor(private datePipe: DatePipe) {}

	public transform({ from, to }: DatePeriod): string {

		if (from === null || to === null) {
			return `No date`;
		}

		if (from.getMonth() === to.getMonth()) {
			return `${this.datePipe.transform(from, 'MMMM d')} - ${this.datePipe.transform(to, 'd, y')}`;
		}

		if (from.getFullYear() === to.getFullYear()) {
			return `${this.datePipe.transform(from, 'MMMM d')} - ${this.datePipe.transform(to, 'MMMM d, y')}`;
		}

		return `${this.datePipe.transform(from, 'MMMM d, y')} - ${this.datePipe.transform(to, 'MMMM d, y')}`;
	}
}
