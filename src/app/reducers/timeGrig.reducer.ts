/* import * as TimeGridActions from '../actions/timeGrid.actions';
import { Event } from '../domain/Event';
import { Board } from '../domain/Board';
import * as UserDeserializer from '../utils/userDeserializer';


export enum EventsStatus {
    NOT_DEFINED, NOT_LOADED, NOT_PROCESSED, NOT_RENDERED, RENDERED
}

export const initialState = {
    events: [],
    currentEvent: null,
    date: {
        from: null,
        to: null
    },
    status: null,
    currentBoard: null
};


export interface DatePeriod {
    from: Date;
    to: Date;
}

export interface TimeGridState {
    events: Event[];
    currentEvent: Event;
    date: DatePeriod;
    status: EventsStatus;
    currentBoard: Board;
}

export const reducer = (state: TimeGridState = initialState, action: TimeGridActions.Actions): TimeGridState => {
    switch (action.type) {
        case TimeGridActions.LOAD_EVENTS_SUCCESS: {

            const events = action.payload.events.filter(event => event.invited.every( i => i.id !== sessionStorage.getItem('_id')));

            return {
                events: events,
                currentEvent: state.currentEvent ? events.filter(e => e.id === state.currentEvent.id)[0] : null,
                date: action.payload.date,
                status: EventsStatus.NOT_PROCESSED,
                currentBoard: state.currentBoard
            };
        }
        case TimeGridActions.LOAD_EVENTS_FAIL: {
          return {
                events: [],
                currentEvent: state.currentEvent,
                date: action.payload.date,
                status: EventsStatus.RENDERED,
                currentBoard: state.currentBoard
            };
        }
        case TimeGridActions.DELETE_EVENT_SUCCESS: {
            return {
                events: state.events,
                currentEvent: null,
                date: state.date,
                status: EventsStatus.NOT_LOADED,
                currentBoard: state.currentBoard
            };
        }

        case TimeGridActions.SET_CURRENT_EVENT: {
            return {
                events: state.events,
                currentEvent: action.payload.event,
                date: state.date,
                status: EventsStatus.RENDERED,
                currentBoard: state.currentBoard
            };
        }

        case TimeGridActions.REMOVE_CURRENT_EVENT: {
            return {
                events: state.events,
                currentEvent: null,
                date: state.date,
                status: EventsStatus.RENDERED,
                currentBoard: state.currentBoard
            };
        }

        case TimeGridActions.SET_DATE: {
            return {
                events: state.events,
                currentEvent: state.currentEvent,
                date: action.payload.date,
                status: EventsStatus.NOT_LOADED,
                currentBoard: state.currentBoard
            };
        }

        case TimeGridActions.EDIT_EVENT_SUCCESS: {
            return {
                events: state.events,
                currentEvent: state.currentEvent ? action.payload.event : state.currentEvent,
                date: state.date,
                status: EventsStatus.NOT_LOADED,
                currentBoard: state.currentBoard
            };
        }

        case TimeGridActions.LEAVE_CURRENT_EVENT_SUCCESS: {
            return {
                events: state.events,
                currentEvent: null,
                date: state.date,
                status: EventsStatus.NOT_LOADED,
                currentBoard: state.currentBoard
            };
        }

        case TimeGridActions.ACCEPT_CURRENT_EVENT_SUCCESS: {
            return {
                events: state.events,
                currentEvent: state.currentEvent,
                date: state.date,
                status: EventsStatus.NOT_LOADED,
                currentBoard: state.currentBoard
            };
        }

        case TimeGridActions.DECLINE_CURRENT_EVENT_SUCCESS: {
            return {
                events: state.events,
                currentEvent: null,
                date: state.date,
                status: EventsStatus.NOT_LOADED,
                currentBoard: state.currentBoard
            };
        }



        case TimeGridActions.LOAD_BOARD_SUCCESS: {
          action.payload.board.participants = UserDeserializer.deserializeUsers( action.payload.board.participants );
          action.payload.board.moderators = UserDeserializer.deserializeUsers( action.payload.board.moderators );
          action.payload.board.invited = UserDeserializer.deserializeUsers( action.payload.board.invited );

          return {
                events: state.events,
                currentEvent: state.currentEvent,
                date: state.date,
                status: EventsStatus.NOT_DEFINED,
                currentBoard: action.payload.board
            };
        }

        case TimeGridActions.LOAD_BOARD_FAIL: {
            return {
                events: state.events,
                currentEvent: state.currentEvent,
                date: state.date,
                status: EventsStatus.RENDERED,
                currentBoard: null
            };
        }

        case TimeGridActions.LOAD_MY_BOARD: {
            return {
                ...state,
                status: EventsStatus.NOT_DEFINED
            };
        }

        case TimeGridActions.EDIT_BOARD_SUCCESS: {
          return {
            events: state.events,
            currentEvent: state.currentEvent,
            date: state.date,
            status: EventsStatus.NOT_LOADED,
            currentBoard: action.payload.board,
          };
        }

        case TimeGridActions.REMOVE_CURRENT_BOARD: {
            return {
                ...state,
                status: EventsStatus.RENDERED,
                currentBoard: null,
            };
        }
        case TimeGridActions.LEAVE_CURRENT_BOARD_SUCCESS: {
          return {
            ...state,
            currentBoard: null
          };
        }
        case TimeGridActions.DELETE_BOARD_SUCCESS: {
          return {
            ...state,
            currentBoard: null
          };
        }
        case TimeGridActions.PROCESS_BOARD_EVENTS_SUCCESS: {
          return {
              ...state,
              status: EventsStatus.NOT_RENDERED
            };
        }
        case TimeGridActions.PROCESS_GRID_EVENTS_SUCCESS: {
          return {
              ...state,
              status: EventsStatus.RENDERED
            };
        }
        default : {
              return state;
          }
    }
};
 */