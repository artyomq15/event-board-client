import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoardComponent } from './my-board.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material';
import * as mock from 'src/testing/mock';
import { BoardStoreServiceStub } from 'src/testing/board.store.service.stub';
import { BoardStoreService } from 'src/app/store/board/board.store.service';
import { MaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResizableModule } from 'angular-resizable-element';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeGridComponent } from '../../grid/timeGrid.component';
import { AppComponent } from 'src/app/app.component';
import { EventTicketComponent } from '../../events/event-ticket/event-ticket.component';
import { EventComponent } from '../../events/event/event.component';
import { BoardComponent } from '../board/board.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthStoreService } from 'src/app/store/auth/auth.store.service';
import { UserRegistrationStoreServiceStub } from 'src/testing/user.registration.store.service.stub';
import { EventStatus } from 'src/app/store/event/event-status';
import { Event } from 'src/app/store/event/event.model';

describe('MyBoardComponent', () => {
  let component: MyBoardComponent;
  let fixture: ComponentFixture<MyBoardComponent>;
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
        RouterTestingModule.withRoutes(mock.routesForBoard)
      ],
      declarations: [
        TimeGridComponent,
        AppComponent,
        EventTicketComponent,
        EventComponent,
        MyBoardComponent,
        BoardComponent,
        NavbarComponent
      ]
    })
      .overrideComponent(MyBoardComponent, {
      set: {
        providers: [
          { provide: AuthStoreService, useClass: UserRegistrationStoreServiceStub},
          { provide: BoardStoreService, useClass: BoardStoreServiceStub},
        ]
      }
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(MyBoardComponent);
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

  it('should call loadEvents', () => {
    sessionStorage.setItem('_id', mock.user.id);

    const spy = spyOn(boardStoreService, 'loadEvents');

    component.loadEvents(component.currentDatePeriod);
    expect(spy).toHaveBeenCalledWith(mock.date, mock.user.id);
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

  it('should call removeCurrentEvent and removeCurrentBoard', () => {
    const spyEvent = spyOn(boardStoreService, 'removeCurrentEvent');

    component.goToBoards();
    expect(spyEvent).toHaveBeenCalled();
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

  describe('#processEvent', () => {
    const event = mock.event as Event;

    describe('board event', () => {

      beforeAll(() => {
        event.board = mock.board;
      });

      it('should fill fields properly if there is board event', () => {
        component.processEvent(event);
        expect(event.showGoToBoard).toBeTruthy();
        expect(event.showParticipants).toBeFalsy();
      });

      it('should set editable false', () => {
        component.processEvent(event);
        expect(event.editable).toBeFalsy();
      });

      it('should push proper bottom command', () => {
        sessionStorage.setItem('_id', mock.user.id);
        component.ngOnInit();
        event.participants = [mock.user];

        component.processEvent(event);
        expect(event.bottomCommands.length).toBe(1);
        expect(event.bottomCommands[0].iconName).toBe('bookmark');

        expect(event.bottomCommands[0].tip).toBe('Remove from my board');

        const spy = spyOn(component, 'leaveEvent');
        event.bottomCommands[0].action(event);
        expect(spy).toHaveBeenCalledWith(event);
      });

      it('should push proper bottom command', () => {
        sessionStorage.setItem('_id', mock.user.id + '1');
        component.ngOnInit();
        event.participants = [mock.user];

        component.processEvent(event);
        expect(event.bottomCommands.length).toBe(1);
        expect(event.bottomCommands[0].iconName).toBe('bookmark_border');
        expect(event.bottomCommands[0].tip).toBe('Add to my board');

        const spy = spyOn(component, 'acceptEvent');
        event.bottomCommands[0].action(event);
        expect(spy).toHaveBeenCalledWith(event);
      });
    });

    describe('user event', () => {

      beforeAll(() => {
        event.board = null;
      });

      afterAll(() => {
        event.board = mock.board;
      });

      it('should fill fields properly if there is not board event', () => {
        component.processEvent(event);
        expect(event.showGoToBoard).toBeFalsy();
        expect(event.showParticipants).toBeTruthy();
      });

      describe('user is not creator', () => {

        beforeAll(() => {
          sessionStorage.setItem('_id', event.creator.id + '1');
          component.ngOnInit();
        });

        it('should set editable false', () => {
          component.processEvent(event);
          expect(event.editable).toBeFalsy();
        });

        it('should push proper top command', () => {
          component.processEvent(event);
          expect(event.topCommands.length).toBe(1);

          expect(event.topCommands[0].iconName).toBe('exit_to_app');
          expect(event.topCommands[0].tip).toBe('Leave');

          const spy = spyOn(component, 'leaveEvent');
          event.topCommands[0].action(event);
          expect(spy).toHaveBeenCalledWith(event);
        });
      });

      describe('user is creator', () => {

        beforeAll(() => {
          sessionStorage.setItem('_id', event.creator.id);
          component.ngOnInit();
        });

        it('should set editable true', () => {
          component.processEvent(event);
          expect(event.editable).toBeTruthy();
        });

        it('should push proper top command', () => {
          component.processEvent(event);
          expect(event.topCommands.length).toBe(2);

          expect(event.topCommands[0].iconName).toBe('edit');
          expect(event.topCommands[0].tip).toBe('Edit');

          const spyEdit = spyOn(component, 'openEventEditDialog');
          event.topCommands[0].action();
          expect(spyEdit).toHaveBeenCalled();

          expect(event.topCommands[1].iconName).toBe('delete');
          expect(event.topCommands[1].tip).toBe('Delete');


          const spyDelete = spyOn(component, 'deleteEvent');
          event.topCommands[1].action(event);
          expect(spyDelete).toHaveBeenCalledWith(event);
        });
      });
    });
  });
});
