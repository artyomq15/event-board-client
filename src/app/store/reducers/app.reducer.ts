import { ActionReducerMap, createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { AppState } from '../states';

import * as AuthReducer from './auth.reducer';
import * as BoardReducer from './board.reducer';

export const reducer: ActionReducerMap<AppState.State> = {
	auth: AuthReducer.reducer,
	board: BoardReducer.reducer
};

export const getAppState: MemoizedSelector<object, AppState.State> = createFeatureSelector<AppState.State>(
	'app'
);
