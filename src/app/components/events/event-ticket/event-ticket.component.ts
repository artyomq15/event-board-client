import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { ResizeEvent } from 'angular-resizable-element';
import { Event, DatePeriod } from 'src/app/store/domain/interfaces';

@Component({
	selector: 'app-event-ticket',
	templateUrl: './event-ticket.component.html',
	styleUrls: ['./event-ticket.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventTicketComponent implements OnInit {
    @Input() public event: Event;

	@Output() public eventOpening: EventEmitter<any> = new EventEmitter<any>();
	@Output() public eventDeleting: EventEmitter<any> = new EventEmitter<any>();
	@Output() public eventDragged: EventEmitter<any> = new EventEmitter<any>();
	@Output() public dragStart: EventEmitter<any> = new EventEmitter<any>();
	@Output() public dragEnd: EventEmitter<any> = new EventEmitter<any>();
	@Output() public resizeEnd: EventEmitter<any> = new EventEmitter<any>();
	@Output() public resizing: EventEmitter<any> = new EventEmitter<any>();
	@Output() public mouseDown: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	public ngOnInit(): void { }

	public openEvent(): void {
		this.eventOpening.emit();
	}

	public deleteEvent(): void {
		this.eventDeleting.emit();
	}

	public dragEvent(): void {
		this.eventDragged.emit();
	}

	public startDrag(ev: DragEvent): void {
		ev.dataTransfer.setData('text/plain', name);
		ev.dataTransfer.effectAllowed = 'move';

		this.dragStart.emit();
	}

	public endDrag(): void {
		this.dragEnd.emit();
	}

	public onResizeEnd(event: ResizeEvent): void {
		if (event.edges.bottom != null || event.edges.top != null) {
			this.resizeEnd.emit(event.edges);
		}
	}

	public onResizing(event: ResizeEvent): void {
		if (event.edges.bottom != null || event.edges.top != null) {
			this.resizing.emit(event.edges);
		}
	}

	public onMouseDown(event: MouseEvent): void {
		this.mouseDown.emit(event.offsetY);
	}
}
