import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import * as mock from 'src/testing/mock';
import {TimeGridComponent} from './timeGrid.component';
import {MatDialog, MatSnackBarModule} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {BoardsComponent} from '../boards/boards.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BoardStoreService } from 'src/app/store/board/board.store.service';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { reducers } from 'src/app/store/reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from 'src/app/app.module';
import { MyBoardComponent } from '../boards/my-board/my-board.component';
import { BoardComponent } from '../boards/board/board.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { EventAddDialogComponent } from '../events/event-add-dialog/event-add-dialog.component';
import { AuthStoreService } from 'src/app/store/auth/auth.store.service';
import { UserRegistrationStoreServiceStub } from 'src/testing/user.registration.store.service.stub';
import { BoardStoreServiceStub } from 'src/testing/board.store.service.stub';
import { Event } from 'src/app/store/event/event.model';
import { SignInComponent } from '../auth/sign-in/sign-in.component';

describe('TimeGridComponent', () => {
  let component: TimeGridComponent;
  let fixture: ComponentFixture<TimeGridComponent>;
  let boardStoreServie: BoardStoreService;
  let dialog: MatDialog;

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
        StoreModule.forRoot({}),
        StoreModule.forFeature('app', reducers),
        RouterTestingModule.withRoutes(appRoutes),
      ],

      declarations: [
        TimeGridComponent,
        SignUpComponent,
        BoardsComponent,
        MyBoardComponent,
        BoardComponent,
        SignInComponent,
        EventAddDialogComponent
      ],
      providers: [
        FormBuilder,
        BoardStoreService,
        MatDialog,
        Overlay
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(TimeGridComponent, {
      set: {
        providers: [
          {provide: BoardStoreService, useClass: BoardStoreServiceStub},
          {provide: AuthStoreService, useClass: UserRegistrationStoreServiceStub}
        ]
      }
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ EventAddDialogComponent ]
      }
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TimeGridComponent);
      component = fixture.componentInstance;

      component.date = mock.date;
      component.events = [mock.event];
      boardStoreServie = fixture.debugElement.injector.get(BoardStoreService);
      dialog = fixture.debugElement.injector.get(MatDialog);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call loadedEvents', async(() => {
    const spy = spyOn(component.loadedEvents, 'emit');
    component.loadEvents();
    expect(spy).toHaveBeenCalled();
  }));

  it('#goToNExtWeek should call loadedEvents', async(() => {
    const spy = spyOn(component.loadedEvents, 'emit');
    component.goToNextWeek();
    expect(spy).toHaveBeenCalled();
  }));

  it('#goToPreviousWeek should call loadedEvents', async(() => {
    const spy = spyOn(component.loadedEvents, 'emit');
    component.goToPreviousWeek();
    expect(spy).toHaveBeenCalled();
  }));

  it('Should call set current event', async(() => {
    const spy = spyOn(component.currentEventAdded, 'emit');
    component.openEvent(mock.event);
    expect(spy).toHaveBeenCalledWith(mock.event);
  }));

  it('Should call remove current event', async(() => {
    const spy = spyOn(component.currentEventRemoved, 'emit');
    component.removeCurrentEvent();
    expect(spy).toHaveBeenCalled();
  }));

  it('Should call eventEdited', async(() => {
    const spy = spyOn(component.eventEdited, 'emit');

    (mock.event as Event).collision = {
      length: 1,
      number: 1
    };

    component.ticketResizeEnd(mock.event, {});
    expect(spy).toHaveBeenCalledWith(mock.event);
  }));

  it('Should call ticketDragStart method', async(() => {
    component.ticketDragStart(mock.event);
    expect(component.currentDraggingEvent).toEqual(mock.event);
  }));

  it('Should call open method of dialog', () => {
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.openEventAddDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('Should compute height', () => {
    component.GRID_PERIOD = '30';
    fixture.detectChanges();
    component.regenerateGrid();


    const GRID_BLOCK_HEIGHT = 40;
    const BORDER_WIDTH = 1;

    const event = mock.event;

    let dateFrom = new Date(2018, 10, 10, 10);
    let dateTo = new Date(2018, 10, 10, 10, 30);
    event.timeFrom = dateFrom;
    event.timeTo = dateTo;

    expect(component.computeEventBlockHeight(event)).toBe((GRID_BLOCK_HEIGHT + BORDER_WIDTH) - BORDER_WIDTH);

    dateFrom = new Date(2018, 10, 10, 10);
    dateTo = new Date(2018, 10, 10, 11);
    event.timeFrom = dateFrom;
    event.timeTo = dateTo;

    expect(component.computeEventBlockHeight(event)).toBe(2 * (GRID_BLOCK_HEIGHT + BORDER_WIDTH) - BORDER_WIDTH);

    dateFrom = new Date(2018, 10, 10, 10);
    dateTo = new Date(2018, 10, 10, 11, 15);
    event.timeFrom = dateFrom;
    event.timeTo = dateTo;

    expect(component.computeEventBlockHeight(event)).toBe(
      2 * (GRID_BLOCK_HEIGHT + BORDER_WIDTH) - BORDER_WIDTH
      + Math.floor((15 * GRID_BLOCK_HEIGHT) / Number(component.GRID_PERIOD))
    );
  });

  it('Should compute top', () => {
    component.GRID_PERIOD = '30';
    fixture.detectChanges();
    component.regenerateGrid();

    const GRID_BLOCK_HEIGHT = 40;
    const BORDER_WIDTH = 1;

    const event = mock.event;

    let dateFrom = new Date(2018, 10, 10, 0);
    let dateTo = new Date(2018, 10, 10, 0, 30);
    event.timeFrom = dateFrom;
    event.timeTo = dateTo;

    expect(component.computeEventBlockTop(event)).toBe(0);

    dateFrom = new Date(2018, 10, 10, 2);
    dateTo = new Date(2018, 10, 10, 4);
    event.timeFrom = dateFrom;
    event.timeTo = dateTo;

    expect(component.computeEventBlockTop(event)).toBe(4 * (GRID_BLOCK_HEIGHT + BORDER_WIDTH));

    dateFrom = new Date(2018, 10, 10, 2, 15);
    dateTo = new Date(2018, 10, 10, 3, 30);
    event.timeFrom = dateFrom;
    event.timeTo = dateTo;

    expect(component.computeEventBlockTop(event)).toBe(
      4 * (GRID_BLOCK_HEIGHT + BORDER_WIDTH)
      + Math.floor((15 * GRID_BLOCK_HEIGHT) / Number(component.GRID_PERIOD)
    ));
  });

  it('Should compute width', () => {
    const EVENT_BLOCK_WIDTH = 90;

    const event = mock.event;
    (event as any).collision = { length: 1 };
    expect(component.computeEventBlockWidth(event)).toBe(EVENT_BLOCK_WIDTH);

    (event as any).collision = { length: 2 };
    expect(component.computeEventBlockWidth(event)).toBe(EVENT_BLOCK_WIDTH / 2);
  });

  it('Should compute left', () => {
    const EVENT_BLOCK_WIDTH = 90;

    const event = mock.event;
    (event as any).collision = { length: 2, number: 1 };
    expect(component.computeEventBlockLeft(event)).toBe(0);

    (event as any).collision = { length: 2, number: 2 };
    expect(component.computeEventBlockLeft(event)).toBe(EVENT_BLOCK_WIDTH / 2);
  });
});
