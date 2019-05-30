export interface User {
	id: string;
	name: string;
	email: string;
	password?: string;
}

export interface Board {
	id: string;
	name: string;
	isPrivate: boolean;
	creator: User;
	moderators: User[];
	participants: User[];
	invited: User[];
	editable?: boolean;
	removable?: boolean;
}

export interface BoardSearch {
	id: string;
	name: string;
	creator: string;
	events: number;
	participants: number;
	isParticipant: boolean;
}

export interface DatePeriod {
	from: Date;
	to: Date;
}

export interface Command {
	iconName: string;
	tip: string;
	action: Function;
}

export interface Collision {
	number: number;
	length: number;
}

export interface Event {
	id: string;
	name: string;
	description: string;
	timeFrom: Date;
	timeTo: Date;
	color: string;
	creator: User;
	participants: User[];
	invited: User[];
	board: Board;

	showParticipants?: boolean;
	showGoToBoard?: boolean;
	editable?: boolean;
	topCommands?: Command[];
	bottomCommands?: Command[];
	collision?: Collision;

	height?: number;
	width?: number;
	top?: number;
	left?: number;
}

export enum EventStatus {
	NOT_DEFINED,
	NOT_LOADED,
	NOT_PROCESSED,
	NOT_RENDERED,
	RENDERED
}

export enum BoardsStatus {
	OBSOLETE,
	REFRESHED
}

export enum ModificationType { ADD, EDIT }
