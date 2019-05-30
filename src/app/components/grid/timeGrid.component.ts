// tslint:disable: max-file-line-count
import {
	Component,
	ElementRef,
	OnInit,
	ViewChild,
	OnDestroy,
	NgZone,
	Output,
	EventEmitter,
	Input,
	OnChanges,
	SimpleChanges,
	ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';

import { fromEvent, Subscription, ReplaySubject, Observable, BehaviorSubject, Subject, race, concat, merge } from 'rxjs';

import * as DateUtil from '../utils/date.util';
import { DatePeriod, Event, Board, ModificationType } from 'src/app/store/domain/interfaces';
import { map, tap, filter, takeUntil, withLatestFrom, takeWhile, distinctUntilChanged } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

interface SelectedBlocks {
	start: number;
	end: number;
}

interface GridBlock {
	id: string;
	class: string;
	selected: boolean;
	hovered: boolean;
}

enum Week {
	sunday = 0,
	monday = 1,
	tuesday = 2,
	wednesday = 3,
	thursday = 4,
	friday = 5,
	saturday = 6
}

interface WeekDayDate {
	sunday: Date;
	monday: Date;
	tuesday: Date;
	wednesday: Date;
	thursday: Date;
	friday: Date;
	saturday: Date;
}

@Component({
	selector: 'app-time-grid',
	templateUrl: './timeGrid.component.html',
	styleUrls: ['../../shared/icon.scss', './timeGrid.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeGridComponent implements OnInit, OnDestroy, OnChanges {

	public renderEvents$: ReplaySubject<Event[]> = new ReplaySubject<Event[]>(1);

	public weekDayDate$: ReplaySubject<WeekDayDate> = new ReplaySubject<WeekDayDate>(1);
	public datePeriod$: Observable<DatePeriod>;

	public gridHeaders$: Observable<any>;
	public gridEvents$: Observable<any>;
	public gridBlocks$: Observable<any[]>;

	public gridHoursSource: ReplaySubject<any[]> = new ReplaySubject<any>(1);
	public gridBlocksSource: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

	public configSource: Subject<any> = new Subject<any>();

	public weekDays: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	public GRID_PERIOD: string = '60';

	public weekDayName: any = {
		sunday: 'Sunday',
		monday: 'Monday',
		tuesday: 'Tuesday',
		wednesday: 'Wednesday',
		thursday: 'Thursday',
		friday: 'Friday',
		saturday: 'Saturday'
	};

	public weekDayDate: WeekDayDate = {
		sunday: null,
		monday: null,
		tuesday: null,
		wednesday: null,
		thursday: null,
		friday: null,
		saturday: null
	};

	public weekDayEvents: any = {
		sunday: [],
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: []
	};

	public canAddEvent: boolean;

	public isDragged: boolean;
	public currentDraggingEvent: Event = null;

	public gridBlocksInformation: any = {
		sunday: [],
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: []
	};

	@ViewChild('grid') public grid: ElementRef;

	@Input() public currentBoard: Board;
	@Input() public events: Event[];
	@Input() public currentEvent: Event;
	@Input() public date: DatePeriod;

	@Output() public loadedEvents: EventEmitter<DatePeriod> = new EventEmitter<DatePeriod>();
	@Output() public currentEventRemoved: EventEmitter<any> = new EventEmitter<any>();
	@Output() public currentEventAdded: EventEmitter<Event> = new EventEmitter<Event>();

	@Output() public eventEdited: EventEmitter<Event> = new EventEmitter<Event>();
	@Output() public processingFinished: EventEmitter<any> = new EventEmitter<any>();
	@Output() public selectedDateAdded: EventEmitter<DatePeriod> = new EventEmitter<DatePeriod>();

	@Output() public eventAdded: EventEmitter<Event> = new EventEmitter<Event>();

	public resizingTooltipData$: Observable<any>;
	private resizingTooltipDatePeriodSource: BehaviorSubject<DatePeriod> = new BehaviorSubject<DatePeriod>(null);

	private ONE_MINUTE_IN_MILLIS: number = 60000;
	private ONE_HOUR_IN_MINUTES: number = 60;

	private gridEventsSource: ReplaySubject<Event[]> = new ReplaySubject<Event[]>(1);
	private selectedBlockIndexesSource: BehaviorSubject<SelectedBlocks> = new BehaviorSubject<SelectedBlocks>(null);
	private hoveredBlockIndexesSource: BehaviorSubject<SelectedBlocks> = new BehaviorSubject<SelectedBlocks>(null);
	private selectedColumnSource: BehaviorSubject<string> = new BehaviorSubject<string>(null);

	private goToNextWeekSource: Subject<void> = new Subject<void>();
	private goToPreviousWeekSource: Subject<void> = new Subject<void>();

	private draggedEventSource: BehaviorSubject<Event> = new BehaviorSubject<Event>(null);

	private isSelectionSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private isDraggedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	private onMouseDownEventSource: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>(1);
	private onMouseOverEventSource: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>(1);
	private onMouseUpEventSource: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>(1);
	private onDoubleClickEventSource: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>(1);
	private onDropEventSource: ReplaySubject<DragEvent> = new ReplaySubject<DragEvent>(1);

	private dragOverGridSub: Subscription;

	private PERIOD_MINUTES: number;
	private PERIOD_HOURS: number;

	private COVERED_BLOCKS_OFFSET: number = 0;

	private EVENT_BLOCK_WIDTH: number = 90;
	private HOUR_BLOCK_HEIGHT: number = 81;
	private GRID_BLOCK_HEIGHT: number = 40;
	private BORDER_WIDTH: number = 1;

	private selectedBlocks: SelectedBlocks;

	private timeFrom: number = 0;
	private timeTo: number = 23;

	constructor(
		private snackBar: MatSnackBar,
		private datePipe: DatePipe,
		private zone: NgZone
	) {}

	public ngOnInit(): void {

		this.gridHeaders$ = this.weekDayDate$.pipe(
			map((weekDayDate: WeekDayDate) =>
				(this.weekDays.map((day: string) => ({
					name: this.weekDayName[day],
					date: weekDayDate[day]
				})))
			)
		);

		this.datePeriod$ = this.weekDayDate$.pipe(
			map((weekdayDate: WeekDayDate) => ({
				from: weekdayDate.sunday,
				to: weekdayDate.saturday
			}))
		);

		this.gridEvents$ = this.gridEventsSource.pipe(
			filter((events: Event[]) => events !== null),
			map((events: Event[]) => {
				const eventsWithCollissions: Event[] = this.findEventCollisions(events);
				const eventsGroupedByWeekDays: any = this.setEventsToWeekDays(eventsWithCollissions);

				return this.weekDays.map((day: string) => eventsGroupedByWeekDays[day]);
			})

		);

		this.gridBlocks$ = this.gridBlocksSource.pipe(
			map((gridBlocks: any[]) => this.weekDays.map((day: string) => gridBlocks[day]))
		);

		this.generateGridPeriod();
		this.setDefaultSelectedDate();

		this.onMouseDownEventSource.pipe(
			map((event: MouseEvent) => event.target as HTMLElement),
			withLatestFrom(
				this.gridBlocksSource,
				this.selectedBlockIndexesSource,
				this.selectedColumnSource),
			tap(([target, gridBlocks, oldSelectedIndexes, oldSelectedColumn]: [HTMLElement, any[], SelectedBlocks, string]) => {

				if (oldSelectedIndexes) {
					const oldColumnBlocks: any[] = gridBlocks[oldSelectedColumn];
					const oldColumn: GridBlock[] = this.unselectBlocksInColumn(oldColumnBlocks, oldSelectedIndexes);

					gridBlocks[oldSelectedColumn] = oldColumn;
				}

				const selectedColumn: string = target.id.split('-')[0];

				const columnBlocks: any[] = gridBlocks[selectedColumn];
				const targetIndex: number = columnBlocks.findIndex((block: any) => block.id === target.id);

				const selectedBlocks: SelectedBlocks = {
					start: targetIndex,
					end: targetIndex
				};
				const newColumn: GridBlock[] = this.selectBlocksInColumn(columnBlocks, selectedBlocks);

				gridBlocks[selectedColumn] = newColumn;

				this.gridBlocksSource.next(gridBlocks);
				this.selectedColumnSource.next(selectedColumn);
				this.selectedBlockIndexesSource.next(selectedBlocks);
				this.isSelectionSource.next(true);
				this.isDraggedSource.next(true);

			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.onMouseOverEventSource.pipe(
			map((event: MouseEvent) => event.target as HTMLElement),
			withLatestFrom(
				this.gridBlocksSource,
				this.selectedBlockIndexesSource,
				this.selectedColumnSource,
				this.isSelectionSource),
			tap(([
				target,
				gridBlocks,
				oldSelectedIndexes,
				oldSelectedColumn,
				isSelection
			]: [HTMLElement, any[], SelectedBlocks, string, boolean]) => {

				const targetColumnName: string = target.id.split('-')[0];

				if (isSelection && targetColumnName === oldSelectedColumn) {
					const columnBlocks: any[] = gridBlocks[oldSelectedColumn];
					const targetIndex: number = columnBlocks.findIndex((block: any) => block.id === target.id);

					if (targetIndex !== oldSelectedIndexes.end) {
						let column: GridBlock[] = this.unselectBlocksInColumn(columnBlocks, oldSelectedIndexes);

						const newSelectedIndexes: SelectedBlocks = {
							...oldSelectedIndexes,
							end: targetIndex
						};

						column = this.selectBlocksInColumn(column, newSelectedIndexes);

						gridBlocks[oldSelectedColumn] = column;

						this.gridBlocksSource.next(gridBlocks);
						this.selectedBlockIndexesSource.next(newSelectedIndexes);
					}
				}
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.onMouseUpEventSource.pipe(
			map((event: MouseEvent) => event.target as HTMLElement),
			withLatestFrom(
				this.gridBlocksSource,
				this.selectedBlockIndexesSource,
				this.selectedColumnSource,
				this.weekDayDate$),
			tap(([
				target,
				gridBlocks,
				selectedIndexes,
				selectedColumn,
				weekDayDate
			]: [HTMLElement, any[], SelectedBlocks, string, WeekDayDate]) => {

				if (selectedIndexes.start > selectedIndexes.end) {
					const temp: number = selectedIndexes.start;
					selectedIndexes.start = selectedIndexes.end;
					selectedIndexes.end = temp;

					this.selectedBlockIndexesSource.next(selectedIndexes);
				}

				const idStartBlock: any = gridBlocks[selectedColumn][selectedIndexes.start].id.split('-');
				const idEndBlock: any = gridBlocks[selectedColumn][selectedIndexes.end].id.split('-');

				const selectedDatePeriod: DatePeriod = {
					from: DateUtil.copyDateUpToMinute(weekDayDate[idStartBlock[0]], Number(idStartBlock[1]), Number(idStartBlock[2])),
					to: DateUtil.copyDateUpToMinute(weekDayDate[idEndBlock[0]], Number(idEndBlock[1]), Number(idEndBlock[2]))
				};

				selectedDatePeriod.to.setMinutes(selectedDatePeriod.to.getMinutes() + this.PERIOD_MINUTES);

				this.selectedDateAdded.emit(selectedDatePeriod);

				this.isSelectionSource.next(false);
				this.isDraggedSource.next(false);
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.onDoubleClickEventSource.pipe(
			withLatestFrom(
				this.gridBlocksSource,
				this.selectedBlockIndexesSource,
				this.selectedColumnSource),
			tap(([
				_event,
				gridBlocks,
				selectedIndexes,
				selectedColumn
			]: [MouseEvent, any[], SelectedBlocks, string]) => {

				let column: GridBlock[] = gridBlocks[selectedColumn];
				column = this.unselectBlocksInColumn(column, selectedIndexes);
				gridBlocks[selectedColumn] = column;

				this.selectedBlockIndexesSource.next(null);
				this.selectedColumnSource.next(null);
				this.gridBlocksSource.next(gridBlocks);

				this.isSelectionSource.next(false);

				this.setDefaultSelectedDate();
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.onDropEventSource.pipe(
			map((event: MouseEvent) => event.target as HTMLElement),
			withLatestFrom(
				this.gridBlocksSource,
				this.hoveredBlockIndexesSource,
				this.draggedEventSource,
				this.weekDayDate$),
			tap(([
				target,
				gridBlocks,
				hoveredIndexes,
				draggedEvent,
				weekDayDate
			]: [HTMLElement, any[], SelectedBlocks, Event, WeekDayDate]) => {
				const targetColumnName: string = target.id.split('-')[0];
				const columnBlocks: any[] = gridBlocks[targetColumnName];

				const column: GridBlock[] = this.unhoverBlocksInColumn(columnBlocks, hoveredIndexes);
				gridBlocks[targetColumnName] = column;

				let targetIndex: number = columnBlocks.findIndex((block: any) => block.id === target.id) - this.COVERED_BLOCKS_OFFSET;

				if (targetIndex < 0) {
					targetIndex = 0;
				}

				if (!draggedEvent || !draggedEvent.editable) {
					return;
				}

				const idParts: string[] = column[targetIndex].id.split('-');

				const durationMillis: number = draggedEvent.timeTo.getTime() - draggedEvent.timeFrom.getTime();

				const hoursDifference: number = Number(idParts[1]) - draggedEvent.timeFrom.getHours();
				const minutesDifference: number = Number(idParts[2]) - draggedEvent.timeFrom.getMinutes();

				const newTimeFrom: Date = DateUtil.copyDateUpToMinute(
					weekDayDate[idParts[0]],
					draggedEvent.timeFrom.getHours() + hoursDifference,
					draggedEvent.timeFrom.getMinutes() + minutesDifference
				);

				const newTimeTo: Date = new Date(newTimeFrom.getTime() + durationMillis);

				this.eventEdited.emit({
					...draggedEvent,
					timeFrom: newTimeFrom,
					timeTo: newTimeTo
				});

				this.draggedEventSource.next(null);
				this.isDraggedSource.next(false);
				this.gridBlocksSource.next(gridBlocks);
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		merge(
			this.goToNextWeekSource.pipe(map(() => this.getNextWeek(this.date))),
			this.goToPreviousWeekSource.pipe(map(() => this.getPreviousWeek(this.date)))
		).pipe(
			withLatestFrom(
				this.gridBlocksSource,
				this.selectedBlockIndexesSource,
				this.selectedColumnSource),
			tap(([date, gridBlocks, selectedIndexes, selectedColumn]: [DatePeriod, any[], SelectedBlocks, string]) => {
				if (selectedColumn) {
					let column: GridBlock[] = gridBlocks[selectedColumn];
					column = this.unselectBlocksInColumn(column, selectedIndexes);
					gridBlocks[selectedColumn] = column;

					this.selectedBlockIndexesSource.next(null);
					this.selectedColumnSource.next(null);
					this.gridBlocksSource.next(gridBlocks);

					this.isSelectionSource.next(false);
				}

				this.setDefaultSelectedDate();
				this.loadedEvents.emit(date);
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.resizingTooltipData$ = fromEvent(window, 'mousemove').pipe(
			withLatestFrom(this.resizingTooltipDatePeriodSource),
			map(([event, tooltipData]: [MouseEvent, DatePeriod]) => {
				if (tooltipData === null) {
					return null;
				}
				return {
					top: event.pageY - 30,
					left: event.pageX,
					text: `${this.datePipe.transform(tooltipData.from, 'H:mm')} - ${this.datePipe.transform(tooltipData.to, 'H:mm')}`
				};
			}),
			distinctUntilChanged()
		);

	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.events) {
			this.gridEventsSource.next(this.events);
		}
		if (changes.date) {
			this.setWeekDaysDates();
		}
	}

	public trackById(_index: number, item: any): string {
		return item.id;
	}

	public trackByIndex(index: number): number {
		return index;
	}

	public openEventModificator(): void {
		this.configSource.next({
			type: ModificationType.ADD
		});
	}

	public addEvent(event: Event): void {
		this.eventAdded.emit(event);
	}

	public onMouseDown($event: MouseEvent): void {
		this.onMouseDownEventSource.next($event);
	}

	public onMouseOver($event: MouseEvent): void {
		this.onMouseOverEventSource.next($event);
	}

	public onMouseUp($event: MouseEvent): void {
		this.onMouseUpEventSource.next($event);
	}

	public onDoubleClick($event: MouseEvent): void {
		this.onDoubleClickEventSource.next($event);
	}

	public onDragEnter($event: DragEvent): void {
		$event.stopPropagation();
		$event.preventDefault();
	}

	public onDragLeave($event: DragEvent): void {
		$event.stopPropagation();
		$event.preventDefault();
	}

	public onDrop($event: DragEvent): void {
		$event.preventDefault();
		this.onDropEventSource.next($event);
	}

	public loadEvents(): void {
		this.loadedEvents.emit(this.date);
	}

	public goToNextWeek(): void {
		this.goToNextWeekSource.next();
	}

	public goToPreviousWeek(): void {
		this.goToPreviousWeekSource.next();
	}

	public openEvent(event: Event): void {
		this.currentEventAdded.emit(event);
	}

	public removeCurrentEvent(): void {
		this.currentEventRemoved.emit();
	}

	public regenerateGrid(): void {
		this.clearCurrentGrid();
		this.generateGridPeriod();
		// this.setEventsToWeekDays();
		this.setDefaultSelectedDate();
	}

	public getNextWeek(date: DatePeriod): DatePeriod {

		const dates: Date[] = DateUtil.getNextWeekdayDates(date.from);

		return {
			from: dates[0],
			to: dates[1]
		};
	}

	public getPreviousWeek(date: DatePeriod): DatePeriod {

		const dates: Date[] = DateUtil.getPreviousWeekdayDates(date.from);

		return {
			from: dates[0],
			to: dates[1]
		};
	}

	public computeEventBlockHeight(event: Event): number {

		const durationMillis: number = event.timeTo.getTime() - event.timeFrom.getTime();
		const durationMinutes: number =
			Math.floor(durationMillis / (this.ONE_MINUTE_IN_MILLIS * this.PERIOD_MINUTES));

		const durationRemainderMinutes: number =
			Math.floor((durationMillis % (this.ONE_MINUTE_IN_MILLIS * this.PERIOD_MINUTES)) / (this.ONE_MINUTE_IN_MILLIS));

		return (durationMinutes * (this.GRID_BLOCK_HEIGHT + this.BORDER_WIDTH))
			+ Math.floor((durationRemainderMinutes * this.GRID_BLOCK_HEIGHT) / this.PERIOD_MINUTES)
			- this.BORDER_WIDTH;
	}

	public computeEventBlockTop(event: Event): number {

		const durationMillis: number = event.timeFrom.getTime() - DateUtil.copyDateUpToDay(event.timeFrom).getTime();

		const durationMinutes: number =
			Math.floor(durationMillis / (this.ONE_MINUTE_IN_MILLIS * this.PERIOD_MINUTES));

		const durationRemainderMinutes: number =
			Math.floor((durationMillis % (this.ONE_MINUTE_IN_MILLIS * this.PERIOD_MINUTES)) / (this.ONE_MINUTE_IN_MILLIS));

		return (durationMinutes * (this.GRID_BLOCK_HEIGHT + this.BORDER_WIDTH))
			+ Math.floor((durationRemainderMinutes * this.GRID_BLOCK_HEIGHT) / this.PERIOD_MINUTES);
	}

	public computeEventBlockWidth(event: Event): number {
		return this.EVENT_BLOCK_WIDTH / event.collision.length;
	}

	public computeEventBlockLeft(event: Event): number {
		return (this.EVENT_BLOCK_WIDTH / event.collision.length) * (event.collision.number - 1);
	}

	// Event handlers

	public ticketDragStart(event: Event): void {
		this.currentDraggingEvent = event;

		this.draggedEventSource.next(event);

		if (!event.editable) {
			this.snackBar.open('You don\'t have permissions for editing this event', 'OK', {
				duration: 2000,
			});
		}
	}

	public ticketDragEnd(): void {
		this.isDraggedSource.next(false);
	}

	public ticketDragged(): void {
		if (!this.currentDraggingEvent.editable) {
			return;
		}
		this.isDraggedSource.next(true);
	}

	public ticketResizing(event: Event, edges: any): void {
		const newDate: DatePeriod = this.getTimeAfterResize(event, edges);

		this.resizingTooltipDatePeriodSource.next(newDate);
	}

	public ticketResizeEnd(event: Event, edges: any): void {

		const newDate: DatePeriod = this.getTimeAfterResize(event, edges);

		event.timeFrom = new Date(newDate.from);
		event.timeTo = new Date(newDate.to);

		this.resizingTooltipDatePeriodSource.next(null);

		this.setEventSizeAndPosition(event);
		this.eventEdited.emit(event);
	}

	public ticketMouseDown(offsetY: any): void {
		this.COVERED_BLOCKS_OFFSET = Math.floor(offsetY / this.GRID_BLOCK_HEIGHT);
	}

	public ngOnDestroy(): void {
		this.dragOverGridSub.unsubscribe();

		this.destroyedSource.next(true);
		this.destroyedSource.complete();
	}

	private countCoveredGridBlocksByEvent(event: Event): number {
		let difference: number = event.timeTo.getTime() - event.timeFrom.getTime();

		difference = Math.ceil(difference / (this.ONE_MINUTE_IN_MILLIS * this.PERIOD_MINUTES));

		return difference - 1;
	}

	private selectBlocksInColumn(column: GridBlock[], selectedIndexes: SelectedBlocks): GridBlock[] {
		if (!selectedIndexes) {
			return column;
		}

		const selected: SelectedBlocks = this.getAscendingIndexes(selectedIndexes);
		const newColumn: GridBlock[] = column.slice();

		for (let i: number = selected.start; i <= selected.end; i++) {
			newColumn[i] = {
				...column[i],
				selected: true
			};
		}

		return newColumn;
	}

	private unselectBlocksInColumn(column: GridBlock[], selectedIndexes: SelectedBlocks): GridBlock[] {
		if (!selectedIndexes) {
			return column;
		}

		const selected: SelectedBlocks = this.getAscendingIndexes(selectedIndexes);
		const newColumn: GridBlock[] = column.slice();

		for (let i: number = selected.start; i <= selected.end; i++) {
			newColumn[i] = {
				...column[i],
				selected: false
			};
		}

		return newColumn;
	}

	private hoverBlocksInColumn(column: GridBlock[], hoveredIndexes: SelectedBlocks): GridBlock[] {
		if (!hoveredIndexes) {
			return column;
		}

		const hovered: SelectedBlocks = this.getAscendingIndexes(hoveredIndexes);
		const newColumn: GridBlock[] = column.slice();

		for (let i: number = hovered.start; i <= hovered.end; i++) {
			newColumn[i] = {
				...column[i],
				hovered: true
			};
		}

		return newColumn;
	}

	private unhoverBlocksInColumn(column: GridBlock[], hoveredIndexes: SelectedBlocks): GridBlock[] {
		if (!hoveredIndexes) {
			return column;
		}

		const hovered: SelectedBlocks = this.getAscendingIndexes(hoveredIndexes);
		const newColumn: GridBlock[] = column.slice();

		for (let i: number = hovered.start; i <= hovered.end; i++) {
			newColumn[i] = {
				...column[i],
				hovered: false
			};
		}

		return newColumn;
	}

	private getAscendingIndexes(selectedBlocks: SelectedBlocks): SelectedBlocks {
		let startIdx: number;
		let endIdx: number;

		if (selectedBlocks.start > selectedBlocks.end) {
			startIdx = selectedBlocks.end;
			endIdx = selectedBlocks.start;
		} else {
			endIdx = selectedBlocks.end;
			startIdx = selectedBlocks.start;
		}

		return {
			start: startIdx,
			end: endIdx
		};
	}

	private clearCurrentGrid(): void {
		this.gridBlocksInformation = {
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: []
		};
		// this.hourBlocksInformation = [];
		this.selectedBlocks = null;
		// this.hoveredBlocks = null;
	}

	private generateGridPeriod(): void {
		this.PERIOD_MINUTES = Number(this.GRID_PERIOD);
		this.PERIOD_HOURS = Math.ceil(this.PERIOD_MINUTES / this.ONE_HOUR_IN_MINUTES);

		let hourBlockHeight: number = this.HOUR_BLOCK_HEIGHT;

		if (this.PERIOD_MINUTES >= this.ONE_HOUR_IN_MINUTES) {
			hourBlockHeight = this.GRID_BLOCK_HEIGHT;
		}

		const space: number = this.timeTo - this.timeFrom + 1;
		let time: number = this.timeFrom;

		const gridHours: any[] = [];
		const gridBlocks: any = {
			sunday: [],
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: []
		};

		for (let i: number = 0; i < Math.ceil(space / this.PERIOD_HOURS); i++) {

			gridHours.push(this.generateHourBlockInformation(time, i, hourBlockHeight));

			for (
				let minutes: number = 0;
				minutes < this.ONE_HOUR_IN_MINUTES * this.PERIOD_HOURS;
				minutes += this.PERIOD_MINUTES
			) {
				this.weekDays.forEach((name: string) => {
					gridBlocks[name].push(this.generateGridInformation(name, time, i, minutes));
				});
			}

			time += this.PERIOD_HOURS;
		}

		this.gridHoursSource.next(gridHours);
		this.gridBlocksSource.next(gridBlocks);

		// this.zone.runOutsideAngular(() => {
			let targetId: string = null;

			this.dragOverGridSub = fromEvent(this.grid.nativeElement, 'dragover').pipe(
				tap((event: DragEvent) => event.preventDefault()),
				map((event: DragEvent) => event.target),
				filter((target: any) => target.id !== targetId),
				withLatestFrom(
					this.gridBlocksSource,
					this.hoveredBlockIndexesSource,
					this.draggedEventSource
				),
				tap(([
					target,
					gridBlocksFromSource,
					hoveredIndexes,
					draggedEvent
				]: [HTMLElement, any[], SelectedBlocks, Event]) => {

					targetId = target.id;

					if (!draggedEvent || !draggedEvent.editable) {
						return;
					}

					for (const i of this.weekDays) {
						const col: GridBlock[] = gridBlocksFromSource[i];
						const newCol: GridBlock[] = this.unhoverBlocksInColumn(col, {
							start: 0,
							end: col.length - 1
						});
						gridBlocksFromSource[i] = newCol;
					}

					const targetColumnIndex: string = target.id.split('-')[0];
					let column: GridBlock[] = gridBlocksFromSource[targetColumnIndex];

					let targetIndex: number = column.findIndex((block: any) => block.id === target.id) - this.COVERED_BLOCKS_OFFSET;

					if (targetIndex < 0) {
						targetIndex = 0;
					}

					let endIndex: number = targetIndex + this.countCoveredGridBlocksByEvent(draggedEvent);

					if (endIndex >= column.length) {
						endIndex = column.length - 1;
					}

					const newHoveredBlocks: SelectedBlocks = {
						start: targetIndex,
						end: endIndex
					};

					column = this.hoverBlocksInColumn(column, newHoveredBlocks);
					gridBlocksFromSource[targetColumnIndex] = column;

					this.hoveredBlockIndexesSource.next(newHoveredBlocks);
					this.gridBlocksSource.next(gridBlocksFromSource);
				}),
				takeUntil(this.destroyedSource)
			).subscribe();
		// });
	}

	private generateGridInformation(dayOfWeek: string, hours: number, i: number, minutes: number): any {
		return {
			id: `${dayOfWeek}-${hours}-${minutes}`,
			class: i % 2 === 0
				? 'container--grid-block container--grid-block__even'
				: 'container--grid-block container--grid-block__odd',
			selected: false,
			hovered: false
		};
	}

	private generateHourBlockInformation(hours: number, i: number, height: number): any {
		return {
			height: `${height}px`,
			text: `${hours}:00`,
			class: i % 2 === 0
				? 'container--hours-block container--grid-block__even'
				: 'container--hours-block container--grid-block__odd'
		};
	}

	private setDefaultSelectedDate(): void {

		const dateFrom: Date = new Date();
		dateFrom.setMinutes(0);

		const dateTo: Date = new Date(dateFrom);
		dateTo.setMinutes(dateTo.getMinutes() + this.PERIOD_MINUTES);

		this.selectedDateAdded.emit({
			from: dateFrom,
			to: dateTo
		});
	}

	private setWeekDaysDates(): void {

		const sundayDate: number = this.date.from.getDate();

		const weekDayDate: WeekDayDate = {
			sunday: null,
			monday: null,
			tuesday: null,
			wednesday: null,
			thursday: null,
			friday: null,
			saturday: null
		};

		this.weekDays.forEach((weekDay: string, index: number) => {
			weekDayDate[weekDay] = DateUtil.copyDateUpToDay(this.date.from);
			weekDayDate[weekDay].setDate(sundayDate + index);
		});

		this.weekDayDate$.next(weekDayDate);
	}

	private setEventsToWeekDays(events: Event[]): any {

		const weekDayEvents: any = {
			sunday: [],
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: []
		};

		events.forEach((event: Event) => {

			this.setEventSizeAndPosition(event);

			switch (event.timeFrom.getDay()) {
				case Week.sunday: {
					weekDayEvents['sunday'].push(event);
					break;
				}
				case Week.monday: {
					weekDayEvents['monday'].push(event);
					break;
				}
				case Week.tuesday: {
					weekDayEvents['tuesday'].push(event);
					break;
				}
				case Week.wednesday: {
					weekDayEvents['wednesday'].push(event);
					break;
				}
				case Week.thursday: {
					weekDayEvents['thursday'].push(event);
					break;
				}
				case Week.friday: {
					weekDayEvents['friday'].push(event);
					break;
				}
				case Week.saturday: {
					weekDayEvents['saturday'].push(event);
					break;
				}
				default: break;
			}
		});

		this.processingFinished.emit();

		return weekDayEvents;
	}

	private setEventSizeAndPosition(event: any): void {
		event.height = this.computeEventBlockHeight(event);
		event.width = this.computeEventBlockWidth(event);
		event.top = this.computeEventBlockTop(event);
		event.left = this.computeEventBlockLeft(event);
	}

	private findEventCollisions(events: Event[]): Event[] {

		if (events.length === 0) {
			return events;
		}

		events.sort((e1: Event, e2: Event) => {
			if (e1.timeFrom.getTime() === e2.timeFrom.getTime()) {
				return (e2.timeTo.getTime() - e2.timeFrom.getTime()) - (e1.timeTo.getTime() - e1.timeFrom.getTime());
			}
			return e1.timeFrom.getTime() - e2.timeFrom.getTime();
		});

		let counter: number = 0;
		let i: number = 0;
		let timeTo: number = this.events[i].timeTo.getTime();

		events[i].collision = {
			number: 1,
			length: 1
		};

		for (let j: number = 1; j < events.length; i++ , j++) {

			events[j].collision = {
				number: 1,
				length: 1
			};

			if (timeTo > events[j].timeFrom.getTime()) {
				if (counter === 0) {
					events[i].collision.number = ++counter;
				}
				events[j].collision.number = ++counter;

				if (events[j].timeTo.getTime() > timeTo) {
					timeTo = events[j].timeTo.getTime();
				}
			} else {
				timeTo = events[j].timeTo.getTime();
				events = this.setCollisionLength(events, counter, i);
				counter = 0;
			}
		}
		return this.setCollisionLength(events, counter, i);
	}

	private setCollisionLength(events: Event[], length: number, idx: number): Event[] {
		let number: number = length + 1;
		if (length > 0) {
			for (let k: number = idx; k >= 0 && number > 1 && events[k].collision.number < number; k--) {
				events[k].collision.length = length;
				number = events[k].collision.number;
			}
		}

		return events;
	}

	private getTimeAfterResize(event: Event, edges: any): DatePeriod {
		if (edges.bottom) {
			let bottomDelta: number;

			bottomDelta = edges.bottom / this.GRID_BLOCK_HEIGHT;

			const newTime: Date = new Date(event.timeTo.getTime());
			newTime.setMinutes(event.timeTo.getMinutes() + Math.ceil(bottomDelta * this.PERIOD_MINUTES));

			return {
				from: new Date(event.timeFrom.getTime()),
				to: newTime
			};
		}

		if (edges.top) {
			let topDelta: number;

			topDelta = edges.top / this.GRID_BLOCK_HEIGHT;

			const newTime: Date = new Date(event.timeFrom.getTime());
			newTime.setMinutes(event.timeFrom.getMinutes() + Math.floor(topDelta * this.PERIOD_MINUTES));

			return {
				from: newTime,
				to: new Date(event.timeTo.getTime())
			};
		}

		return {
			from: new Date(event.timeFrom.getTime()),
			to: new Date(event.timeTo.getTime())
		};
	}
}
