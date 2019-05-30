import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material';
import { MyBoardComponent } from '../my-board/my-board.component';
import * as mock from 'src/testing/mock';
import { ResizableModule } from 'angular-resizable-element';

import { BoardStoreServiceStub } from 'src/testing/board.store.service.stub';
import { MaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardsComponent } from '../boards.component';
import { TimeGridComponent } from '../../grid/timeGrid.component';
import { EventTicketComponent } from '../../events/event-ticket/event-ticket.component';
import { AppComponent } from 'src/app/app.component';
import { EventComponent } from '../../events/event/event.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TokenExistsGuard } from 'src/app/services/guards/token-exists.guard';
import { Event, EventStatus } from 'src/app/store/domain/interfaces';
import { BoardStoreService } from 'src/app/store/services';
import { TokenNotExistsGuard } from 'src/app/services/guards/token-not-exists.guard';

describe('BoardComponent', () => {
	let component: BoardComponent;
	let fixture: ComponentFixture<BoardComponent>;
	let boardStoreService: BoardStoreService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MaterialModule,
				FormsModule,
				ReactiveFormsModule,
				NoopAnimationsModule,
				BrowserModule,
				BrowserAnimationsModule,
				MatSnackBarModule,
				ResizableModule,
				RouterTestingModule.withRoutes(mock.routesForBoards)
			],
			declarations: [
				BoardComponent,
				BoardsComponent,
				TimeGridComponent,
				AppComponent,
				EventTicketComponent,
				EventComponent,
				MyBoardComponent,
				NavbarComponent
			],
			providers: [
				TokenExistsGuard,
				TokenNotExistsGuard
			]
		})
			.overrideComponent(BoardComponent, {
				set: {
					providers: [
						{ provide: BoardStoreService, useClass: BoardStoreServiceStub },
					]
				}
			})
			.compileComponents().then(() => {
				fixture = TestBed.createComponent(BoardComponent);
				component = fixture.componentInstance;
				boardStoreService = fixture.debugElement.injector.get(BoardStoreService);
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('#checkStatus', () => {
		it('should handle NOT_DEFINED case', () => {
			const spy = spyOn(component, 'findOutCurrentBoardDate');
			component.checkStatus(EventStatus.NOT_DEFINED);
			expect(spy).toHaveBeenCalled();
		});

		it('should handle NOT_LOADED case', () => {
			const spy = spyOn(component, 'loadEvents');
			component.checkStatus(EventStatus.NOT_LOADED);
			expect(spy).toHaveBeenCalled();
		});

		it('should handle NOT_PROCESSED case', () => {
			const spy = spyOn(component, 'processEvents');
			component.checkStatus(EventStatus.NOT_PROCESSED);
			expect(spy).toHaveBeenCalled();
		});
	});

	it('should call loadEventsByBoardId', () => {
		const spy = spyOn(boardStoreService, 'loadEventsByBoardId');
		component.loadEvents(component.currentDatePeriod);
		expect(spy).toHaveBeenCalledWith(mock.date, mock.board.id);
	});

	it('should call setDate', () => {
		const spyService = spyOn(boardStoreService, 'setDate');
		component.findOutCurrentBoardDate();
		expect(spyService).toHaveBeenCalledWith(mock.date);
	});

	it('should call finishBoardEventsProcessing', () => {
		const spyService = spyOn(boardStoreService, 'finishBoardEventsProcessing');
		component.processEvents();
		expect(spyService).toHaveBeenCalled();
	});

	it('should call setCurrentEvent', () => {
		const spyService = spyOn(boardStoreService, 'setCurrentEvent');
		component.addCurrentEvent(mock.event);
		expect(spyService).toHaveBeenCalledWith(mock.event);
	});

	it('should call removeCurrentEvent', () => {
		const spyService = spyOn(boardStoreService, 'removeCurrentEvent');
		component.removeCurrentEvent();
		expect(spyService).toHaveBeenCalled();
	});

	it('should call deleteEvent', () => {
		const spyService = spyOn(boardStoreService, 'deleteEvent');
		component.deleteEvent(mock.event);
		expect(spyService).toHaveBeenCalledWith(mock.event);
	});

	it('should call leaveCurrentEvent', () => {
		const spyService = spyOn(boardStoreService, 'leaveCurrentEvent');
		component.leaveEvent(mock.event);
		expect(spyService).toHaveBeenCalledWith(mock.event);
	});

	it('should call acceptCurrentEvent', () => {
		const spyService = spyOn(boardStoreService, 'acceptCurrentEvent');
		component.acceptEvent(mock.event);
		expect(spyService).toHaveBeenCalledWith(mock.event);
	});

	it('should call editEvent', () => {
		const spyService = spyOn(boardStoreService, 'editEvent');
		component.editEvent(mock.event);
		expect(spyService).toHaveBeenCalledWith(mock.event);
	});

	it('should call leaveBoard', () => {
		const spyService = spyOn(boardStoreService, 'leaveBoard');
		component.leaveBoard();
		expect(spyService).toHaveBeenCalledWith(mock.board);
	});

	it('should call deleteBoard', () => {
		const spyService = spyOn(boardStoreService, 'deleteBoard');
		component.deleteBoard();
		expect(spyService).toHaveBeenCalledWith(mock.board);
	});

	it('should call finishGridEventsProcessing', () => {
		const spyService = spyOn(boardStoreService, 'finishGridEventsProcessing');
		component.finishGridEventsProcessing();
		expect(spyService).toHaveBeenCalled();
	});

	it('should call addSelectedDate', () => {
		const spyService = spyOn(boardStoreService, 'addSelectedDate');
		component.addSelectedDate(mock.date);
		expect(spyService).toHaveBeenCalledWith(mock.date);
	});

	it('should call removeCurrentEvent and removeCurrentBoard', () => {
		const spyEvent = spyOn(boardStoreService, 'removeCurrentEvent');
		const spyBoard = spyOn(boardStoreService, 'removeCurrentBoard');
		component.goToBoards();
		expect(spyEvent).toHaveBeenCalled();
		expect(spyBoard).toHaveBeenCalled();
	});

	describe('#processEvent', () => {
		it('should fill fields', () => {
			const event: Event = mock.event;
			component.processEvent(event);
			expect(event.showGoToBoard).toBeFalsy();
			expect(event.showParticipants).toBeFalsy();
		});

		it('should set editable true', () => {
			sessionStorage.setItem('_id', component.currentBoard.creator.id);
			component.ngOnInit();

			const event: Event = mock.event;
			component.processEvent(event);

			expect(event.editable).toBeTruthy();
		});

		it('should set editable false', () => {
			sessionStorage.setItem('_id', component.currentBoard.creator.id + '1');
			component.ngOnInit();

			const event: Event = mock.event;
			component.processEvent(event);

			expect(event.editable).toBeFalsy();
		});

		describe('Commands', () => {
			it('should push top commands when event is editable', () => {
				sessionStorage.setItem('_id', component.currentBoard.creator.id);
				component.ngOnInit();

				const event: Event = mock.event;
				component.processEvent(event);

				expect(event.topCommands.length).toBe(2);
				expect(event.topCommands[0].iconName).toBe('edit');
				expect(event.topCommands[1].iconName).toBe('delete');

				expect(event.topCommands[0].tip).toBe('Edit');
				expect(event.topCommands[1].tip).toBe('Delete');

				const spyEventEditDialog = spyOn(component, 'openEventEditDialog');
				event.topCommands[0].action();
				expect(spyEventEditDialog).toHaveBeenCalled();

				const spyDeleteEvent = spyOn(component, 'deleteEvent');
				event.topCommands[1].action(event);
				expect(spyDeleteEvent).toHaveBeenCalledWith(event);
			});

			it('should not push top commands when event is not editable', () => {
				sessionStorage.setItem('_id', component.currentBoard.creator.id + '1');
				component.ngOnInit();

				const event: Event = mock.event;
				component.processEvent(event);

				expect(event.topCommands.length).toBe(0);
			});

			it('should push bottom commands when user is patricipant', () => {
				sessionStorage.setItem('_id', component.currentBoard.creator.id);
				component.ngOnInit();

				const event: Event = mock.event;
				mock.user.id = sessionStorage.getItem('_id');
				event.participants = [mock.user];
				component.processEvent(event);

				expect(event.bottomCommands.length).toBe(1);
				expect(event.bottomCommands[0].iconName).toBe('bookmark');

				expect(event.bottomCommands[0].tip).toBe('Remove from my board');

				const spy = spyOn(component, 'leaveEvent');
				event.bottomCommands[0].action(event);
				expect(spy).toHaveBeenCalledWith(event);
			});

			it('should push bottom commands when user is not patricipant', () => {
				sessionStorage.setItem('_id', component.currentBoard.creator.id + '1');
				component.ngOnInit();

				const event: Event = mock.event;
				component.processEvent(event);

				expect(event.bottomCommands.length).toBe(1);
				expect(event.bottomCommands[0].iconName).toBe('bookmark_border');

				expect(event.bottomCommands[0].tip).toBe('Add to my board');

				const spy = spyOn(component, 'acceptEvent');
				event.bottomCommands[0].action(event);
				expect(spy).toHaveBeenCalledWith(event);
			});
		});
	});
});
