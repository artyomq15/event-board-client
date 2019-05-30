import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { event } from 'src/testing/mock';
import { ResizableModule } from 'angular-resizable-element';
import { EventTicketComponent } from './event-ticket.component';

describe('EventTicketComponent', () => {
  let component: EventTicketComponent;
  let fixture: ComponentFixture<EventTicketComponent>;
  let time;
  let header;
  let description;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ResizableModule ],
      declarations: [ EventTicketComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.name = event.name;
    component.description = event.description;
    component.timeFrom = event.timeFrom;
    component.timeTo = event.timeTo;
    header = fixture.nativeElement.querySelector('header');
    time = fixture.nativeElement.querySelector('span');
    description = fixture.nativeElement.querySelector('.event-description');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get correct event', () => {
    expect(component.name).toEqual(event.name);
    expect(component.description).toEqual(event.description);
    expect(component.timeTo).toEqual(event.timeTo);
    expect(component.timeFrom).toEqual(event.timeFrom);
  });
  it('should emit eventOpening', () => {
    const spy = spyOn(component.eventOpening, 'emit');
    component.openEvent();
    expect(spy).toHaveBeenCalled();
  });
  it('should emit eventDeleting', () => {
    const spy = spyOn(component.eventDeleting, 'emit');
    component.deleteEvent();
    expect(spy).toHaveBeenCalled();
  });
  it('should emit dragStart', () => {
    const spy = spyOn(component.dragStart, 'emit');
    const dragEvent: any = {
      dataTransfer: {
        setData: function (dataType: string, name: string): void {
        },
        effectAllowed: ''
      }
    };
    component.startDrag(dragEvent);
    expect(spy).toHaveBeenCalled();
  });
  it('should emit eventDragged', () => {
    const spy = spyOn(component.eventDragged, 'emit');
    component.dragEvent();
    expect(spy).toHaveBeenCalled();
  });
  it('should emit dragEnd', () => {
    const spy = spyOn(component.dragEnd, 'emit');
    component.endDrag();
    expect(spy).toHaveBeenCalled();
  });
  it('should emit resizeEnd', () => {
    const spy = spyOn(component.resizeEnd, 'emit');
    const resizeEvent: any = {
      edges: {
        top: 1
      }
    };
    component.onResizeEnd(resizeEvent);
    expect(spy).toHaveBeenCalled();
  });
});
