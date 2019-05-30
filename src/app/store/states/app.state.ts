import * as AuthState from './auth.state';
import * as BoardState from './board.state';

export interface State {
	auth: AuthState.State;
	board: BoardState.State;
}
