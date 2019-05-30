import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Router } from '@angular/router';
import { Event } from 'src/app/store/domain/interfaces';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit {

	@Input() public currentEvent: Event;

	@Output() public removeCurrentEvent: EventEmitter<any> = new EventEmitter<any>();

	constructor(private router: Router) { }

    public ngOnInit(): void { }

	public goToBoard(id: string): void {
		this.router.navigate(['/boards', id]);
	}

	public hideEvent(): void {
		this.removeCurrentEvent.emit();
	}

	public computeDuration(timeFrom: Date, timeTo: Date): string {
		let result: string = '';

		const seconds: number = Math.floor((timeTo.getTime() - timeFrom.getTime()) / 1000);
		const minutes: number = Math.floor(seconds / 60);
		const hours: number = Math.floor(minutes / 60);

		if (hours >= 1) {
			result = result + hours + (hours > 1 ? ' hours' : ' hour');
		}
		if (minutes > 0 && minutes % 60 !== 0) {
			result = result + (result === '' ? '' : ' ') + (minutes % 60) + (minutes > 1 ? ' minutes' : ' minute');
		}

		return result;
	}
}
