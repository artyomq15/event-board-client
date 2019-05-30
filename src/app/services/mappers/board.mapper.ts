import { Board } from 'src/app/store/domain/interfaces';

import * as UserMapper from './user.mapper';

export function mapMany(boards: any[]): Board[] {
	return boards.map((board: any) => mapOne(board));
}

export function mapOne(board: any): Board {
	return {
		id: board._id,
		name: board.name,
		isPrivate: board.isPrivate,
		creator: UserMapper.mapOne(board.creator[0]),
		moderators: UserMapper.mapMany(board.moderators),
		participants: UserMapper.mapMany(board.participants),
		invited: UserMapper.mapMany(board.invited)
	};
}
