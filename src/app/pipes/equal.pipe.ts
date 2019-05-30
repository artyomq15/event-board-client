import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'equal'
})
export class EqualPipe implements PipeTransform {
	public transform(value: any, compare: any): boolean {
		return value === compare;
	}
}
