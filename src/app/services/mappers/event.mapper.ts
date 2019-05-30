import { Event, Board } from 'src/app/store/domain/interfaces';

import * as UserMapper from './user.mapper';

export function mapMany(events: any[]): Event[] {
	return events.map((event: any) => mapOne(event));
}

export function mapOne(event: any): Event {
	return {
		id: event._id,
		name: event.name,
		description: event.description,
		timeFrom: new Date(event.timeFrom),
		timeTo: new Date(event.timeTo),
		color: event.color,
		creator: UserMapper.mapOne(event.creator[0]),
		participants: UserMapper.mapMany(event.participants),
		invited: UserMapper.mapMany(event.invited),
		board: mapEventBoard(event.board)
	};
}

function mapEventBoard(board: any[]): Board {
	if (board.length > 0) {
		return {
			id: board[0]._id,
			name: board[0].name,
			isPrivate: board[0].isPrivate,
			creator: null,
			moderators: [],
			participants: [],
			invited: []
		};
	}
	return null;
}
