/* import {Injectable} from '@angular/core';
import * as TimeGridActions from '../actions/timeGrid.actions';
import { Event } from '../domain/Event';
import { DatePeriod, EventsStatus } from '../reducers/timeGrig.reducer';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers/reducer';
import { Observable, BehaviorSubject } from 'rxjs';
import { Board } from '../domain/Board';

@Injectable()
export class EventStoreService {

  private events$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  private date$: BehaviorSubject<DatePeriod> = new BehaviorSubject<DatePeriod>(null);
  private currentEvent$: BehaviorSubject<Event> = new BehaviorSubject<Event>(null);
  private status$: BehaviorSubject<EventsStatus> = new BehaviorSubject<EventsStatus>(null);
  private currentBoard$: BehaviorSubject<Board> = new BehaviorSubject<Board>(null);

  constructor(private store: Store<AppState>) {
    store
      .pipe(select('app'))
      .subscribe(state => {
        this.events$.next(state.timeGrid.events);
        this.date$.next(state.timeGrid.date);
        this.currentEvent$.next(state.timeGrid.currentEvent);
        this.currentBoard$.next(state.timeGrid.currentBoard);
        this.status$.next(state.timeGrid.status);
      });
  }

  get events(): Observable<Event[]> {
    return this.events$.asObservable();
  }

  get date(): Observable<DatePeriod> {
    return this.date$.asObservable();
  }

  get currentEvent(): Observable<Event> {
    return this.currentEvent$.asObservable();
  }

  get status(): Observable<EventsStatus> {
    return this.status$.asObservable();
  }

  get currentBoard(): Observable<Board> {
    return this.currentBoard$.asObservable();
  }

  public loadEvents(currentDate: DatePeriod, userId: string) {
    this.store.dispatch( new TimeGridActions.LoadEvents({date: currentDate, userId}));
  }

  public loadEventsByBoardId(currentDate: DatePeriod, boardId: string) {
    this.store.dispatch( new TimeGridActions.LoadEventsByBoardId({date: currentDate, boardId}));
  }

  public deleteEvent(event) {
    this.store.dispatch( new TimeGridActions.DeleteEvent({event}));
  }

  public editEvent (event: Event) {
    this.store.dispatch( new TimeGridActions.EditEvent({event}));
  }

  public setCurrentEvent (event: Event) {
    this.store.dispatch( new TimeGridActions.SetCurrentEvent({event}));
  }

  public removeCurrentEvent () {
    this.store.dispatch( new TimeGridActions.RemoveCurrentEvent({}));
  }

  public setDate (date: DatePeriod) {
    this.store.dispatch( new TimeGridActions.SetDate({date}));
  }
  public leaveCurrentEvent (event: Event ) {
    this.store.dispatch( new TimeGridActions.LeaveCurrentEvent({event}));
  }
  public acceptCurrentEvent (event: Event ) {
    this.store.dispatch( new TimeGridActions.AcceptCurrentEvent({event}));
  }
  public declineCurrentEvent (event: Event) {
    this.store.dispatch( new TimeGridActions.DeclineCurrentEvent({event}));
  }

  public loadBoard(id: string) {
    this.store.dispatch(new TimeGridActions.LoadBoard({ id }));
  }

  public loadMyBoard() {
    this.store.dispatch(new TimeGridActions.LoadMyBoard({}));
  }

  public removeCurrentBoard() {
    this.store.dispatch( new TimeGridActions.RemoveCurrentBoard({}));
  }
  public leaveBoard(board: Board) {
    this.store.dispatch( new TimeGridActions.LeaveBoard({board}));
  }
  public deleteBoard(board: Board) {
    this.store.dispatch( new TimeGridActions.DeleteBoard({board}));
  }

  public finishGridEventsProcessing() {
    this.store.dispatch( new TimeGridActions.ProcessGridEventsSuccess({}));
  }

  public finishBoardEventsProcessing() {
    this.store.dispatch( new TimeGridActions.ProcessBoardEventsSuccess({}));
  }
}
 */