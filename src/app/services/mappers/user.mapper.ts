import { User } from 'src/app/store/domain/interfaces';

import { UserRaw } from './raw-interfaces';

export function mapMany(users: UserRaw[]): User[] {
	return users.map((user: any) => mapOne(user));
}

export function mapOne(user: UserRaw): User {
	return {
		id: user._id,
		name: user.name,
		email: user.email
	};
}
