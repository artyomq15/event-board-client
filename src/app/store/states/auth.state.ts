import { User } from '../domain/interfaces';

export interface State {
	currentUser: User;
	isLoggedIn: boolean;
	message: string;
}

export const initialState: State = {
	currentUser: null,
	isLoggedIn: false,
	message: null
};
