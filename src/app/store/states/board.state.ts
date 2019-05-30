import { User, DatePeriod, Board, Event, EventStatus, BoardsStatus, BoardSearch } from '../domain/interfaces';

export interface State {
	boards: Board[];
	invites: {
		boards: Board[],
		events: Event[],
		status: BoardsStatus
	};
	boardModification: {
		moderators: User[];
		invited: User[];
		participants: User[];
	};
	currentBoard: Board;
	boardsStatus: BoardsStatus;

	currentUser: User;

	events: Event[];
	eventModification: {
		addedUsers: User[];
		invited: User[];
		participants: User[];
		message: string;
	};
	currentEvent: Event;

	currentDatePeriod: DatePeriod;
	selectedDatePeriod: DatePeriod;

	search: {
		foundUsers: User[],
		foundBoards: BoardSearch[]
	};

	status: EventStatus;
}

export const initialState: State = {
	boards: [],
	invites: {
		boards: [],
		events: [],
		status: BoardsStatus.OBSOLETE
	},
	boardModification: {
		moderators: [],
		invited: [],
		participants: [],
	},
	currentBoard: null,
	boardsStatus: BoardsStatus.OBSOLETE,
	currentUser: null,
	events: [],
	eventModification: {
		addedUsers: [],
		invited: [],
		participants: [],
		message: null
	},
	currentEvent: null,
	currentDatePeriod: {
		from: null,
		to: null
	},
	selectedDatePeriod: {
		from: null,
		to: null
	},
	search: {
		foundUsers: [],
		foundBoards: []
	},
	status: null
};
