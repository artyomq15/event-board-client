/* import { User } from '../domain/User';
import { EventsStatus, initialState, reducer, TimeGridState } from './timeGrig.reducer';
import { Event } from '../domain/Event';
import {
  AcceptCurrentEventSucess,
  DeclineCurrentEventSuccess, DeleteBoardSuccess,
  DeleteEventSuccess, EditBoardSuccess, EditEventSuccess, LeaveCurrentEventSuccess, LoadBoardFail, LoadBoardSuccess,
  LoadEventsFail,
  LoadEventsSuccess, LoadMyBoard, ProcessBoardEventsSuccess, ProcessGridEventsSuccess, RemoveCurrentBoard,
  RemoveCurrentEvent,
  SetCurrentEvent,
  SetDate
} from '../actions/timeGrid.actions';
import { DatePeriod } from './timeGrig.reducer';
import * as mock from '../../testing/mock';

describe('Time Grid Reducer', () => {
  const user = new User('', 'qwe', 'qwe', 'qwe', 'qwe');
  const mockDateFrom = new Date(2018, 12, 10);
  const mockDateTo = new Date(2018, 12, 10);
  const events = [new Event('', 'qwe', 'fsdf', mockDateFrom, mockDateTo, '#000000', user, [user], [], null),
    new Event('', 'qwe', 'fsdf', mockDateFrom, mockDateTo, '#000000', user, [user], [user], null)];
  const event = new Event('', 'qwe', 'fsdf', mockDateFrom, mockDateTo, '#000000', user, [user], [], null);
  const date: DatePeriod = {from: mockDateFrom, to: mockDateTo};
  const state: TimeGridState = initialState;
  describe('[TIME GRID] Load events success', () => {
    it('should load state', () => {
      const action = new LoadEventsSuccess({events, date});

      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: events,
        currentEvent: state.currentEvent,
        date: date,
        status: EventsStatus.NOT_PROCESSED
      });
    });
  });
  describe('[TIME GRID] Load events fail', () => {
    it('should load state', () => {
      const action = new LoadEventsFail({events, date});

      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: state.currentEvent,
        date: date,
        status: EventsStatus.RENDERED
      });
    });
  });
  describe('[TIME GRID] Delete event success', () => {
    it('should load state', () => {
      const action = new DeleteEventSuccess({event});

      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: null,
        date: { from: null,
                  to: null},
        status: EventsStatus.NOT_LOADED
      });
    });
  });
  describe('[TIME GRID] Set current event', () => {
    it('should load state', () => {
      const action = new SetCurrentEvent({event});

      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: event,
        date: { from: null,
          to: null},
        status: EventsStatus.RENDERED
      });
    });
  });
  describe('[TIME GRID] Remove current event', () => {
    it('should load state', () => {
      const action = new RemoveCurrentEvent({});

      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: null,
        date: { from: null,
          to: null},
        status: EventsStatus.RENDERED
      });
    });
  });
  describe('[TIME GRID] Set date', () => {
    it('should load state', () => {
      const action = new SetDate({date});

      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: null,
        date: date,
        status: EventsStatus.NOT_LOADED
      });
    });
  });
  describe('[TIME GRID] Edit event success', () => {
    it('should load state (currentEvent is null)', () => {
      const action = new EditEventSuccess({event});
      state.currentEvent = null;
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: null,
        date: { from: null,
                 to: null},
        status: EventsStatus.NOT_LOADED
      });
    });
    it('should load state (currentEvent is not null)', () => {
      const action = new EditEventSuccess({event});
      state.currentEvent = event;
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: event,
        date: { from: null,
          to: null},
        status: EventsStatus.NOT_LOADED
      });
    });
  });
  describe('[TIME GRID] Leave current event', () => {
    it('should load state', () => {
      const action = new LeaveCurrentEventSuccess({event});
      const date_mock: DatePeriod = {from: null, to: null};
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: null,
        date: date_mock,
        status: EventsStatus.NOT_LOADED
      });
    });
  });
  describe('[TIME GRID] Accept current event', () => {
    it('should load state', () => {
      const action = new AcceptCurrentEventSucess({event});
      const date_mock: DatePeriod = {from: null, to: null};
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: state.currentEvent,
        date: date_mock,
        status: EventsStatus.NOT_LOADED
      });
    });
  });
  describe('[TIME GRID] Decline current event', () => {
    it('should load state', () => {
      const action = new DeclineCurrentEventSuccess({event});
      const date_mock: DatePeriod = {from: null, to: null};
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        events: [],
        currentEvent: null,
        date: date_mock,
        status: EventsStatus.NOT_LOADED
      });
    });
  });
  describe('[TIME GRID] Load Board Success', () => {
    it('should load state', () => {
      const action = new LoadBoardSuccess({ board: mock.board});
      const date_mock: DatePeriod = {from: null, to: null};
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        status: EventsStatus.NOT_DEFINED,
        currentBoard: mock.board
      });
    });
  });
  describe('[TIME GRID] Load Board fail', () => {
    it('should load state', () => {
      const action = new LoadBoardFail({ board: mock.board});
      const date_mock: DatePeriod = {from: null, to: null};
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        status: EventsStatus.RENDERED,
        currentBoard: null
      });
    });
  });
  describe('[TIME GRID] Load my board', () => {
    it('should load state', () => {
      const action = new LoadMyBoard({ board: mock.board});
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        status: EventsStatus.NOT_DEFINED,
      });
    });
  });
  describe('[TIME GRID] Edit board success', () => {
    it('should load state', () => {
      const action = new EditBoardSuccess({ board: mock.board});
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        status: EventsStatus.NOT_LOADED,
        currentBoard: mock.board
      });
    });
  });
  describe('[TIME GRID] Remove current board', () => {
    it('should load state', () => {
      const action = new RemoveCurrentEvent({ board: mock.board});
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        currentEvent: null,
        status: EventsStatus.RENDERED,
        currentBoard: null
      });
    });
  });
  describe('[TIME GRID] Delete board success', () => {
    it('should load state', () => {
      const action = new DeleteBoardSuccess({ board: mock.board});
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        currentBoard: null
      });
    });
  });
  describe('[TIME GRID] Process board events success', () => {
    it('should load state', () => {
      const action = new ProcessBoardEventsSuccess({ board: mock.board});
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        status: EventsStatus.NOT_RENDERED
      });
    });
  });
  describe('[TIME GRID] Process grid events success', () => {
    it('should load state', () => {
      const action = new ProcessGridEventsSuccess({ board: mock.board});
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        status: EventsStatus.RENDERED
      });
    });
  });
});
 */