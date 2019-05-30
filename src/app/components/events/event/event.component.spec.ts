import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Event } from 'src/app/store/event/event.model';
import { EventComponent } from './event.component';
import {RouterTestingModule} from '@angular/router/testing';
import * as mock from 'src/testing/mock';
import { MaterialModule } from 'src/app/material.module';
import { BoardStoreService } from 'src/app/store/board/board.store.service';
import { BoardStoreServiceStub } from 'src/testing/board.store.service.stub';
import { AuthStoreService } from 'src/app/store/auth/auth.store.service';
import { UserRegistrationStoreServiceStub } from 'src/testing/user.registration.store.service.stub';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes(mock.routesForEvent),

      ],
      declarations: [ EventComponent ],
      providers: []
    })
      .overrideComponent(
        EventComponent,
      {
        set: {
          providers: [
            {provide: AuthStoreService, useClass: UserRegistrationStoreServiceStub},
            {provide: BoardStoreService, useClass: BoardStoreServiceStub},
          ]
        }
      }
    )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    component.currentEvent = mock.event;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentEvent).toEqual(mock.event);
  });

  it('should emit removeCurrentEvent', () => {
    const spy = spyOn(component.removeCurrentEvent, 'emit');
    component.hideEvent();
    expect(spy).toHaveBeenCalled();
  });
});

