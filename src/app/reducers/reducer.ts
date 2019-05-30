/* import * as timeGrid from './timeGrig.reducer';
import * as board from './board.reducer';
import * as addEvent from './event-modifier.reducer';
import * as registrationAuthorization from './registration-authorization.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface AppState {
    timeGrid: timeGrid.TimeGridState;
    addEvent: addEvent.EventModifierState;
    registrationAuthorization: registrationAuthorization.RegistrationAuthorizationState;
    board: board.BoardState;
}

export const reducers: ActionReducerMap<AppState> = {
    timeGrid: timeGrid.reducer,
    addEvent: addEvent.reducer,
    registrationAuthorization: registrationAuthorization.reducer,
    board: board.reducer
};

export const getAppState = createFeatureSelector<AppState>(
    'app'
);
 */