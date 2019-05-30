/* import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable, BehaviorSubject, from } from 'rxjs';

import { AppState } from '../reducers/reducer';

import * as BoardActions from '../actions/board.actions';
import * as TimeGridActions from '../actions/timeGrid.actions';

import { Board } from '../domain/Board';
import { User } from '../domain/User';
import { Event } from '../domain/Event';

@Injectable()
export class BoardStoreService {

  private boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  private boardInvites$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  private invited$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private moderators$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private participants$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private eventInvites$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  constructor(private store: Store<AppState>) {
    store
      .pipe(select('app'))
      .subscribe(state => {
        this.boards$.next(state.board.boards);
        this.boardInvites$.next(state.board.boardInvites);
        this.invited$.next(state.board.invited);
        this.moderators$.next(state.board.moderators);
        this.participants$.next(state.board.participants);
        this.eventInvites$.next(state.board.eventInvites);
      });
  }
  get board(): Observable<Board[]> {
    return this.boards$.asObservable();
  }
  get boardInvites(): Observable<Board[]> {
    return this.boardInvites$.asObservable();
  }
  get invited(): Observable<User[]> {
    return this.invited$.asObservable();
  }
  get moderators(): Observable<User[]> {
    return this.moderators$.asObservable();
  }
  get participants(): Observable<User[]> {
    return this.participants$.asObservable();
  }
  get eventInvites(): Observable<Event[]> {
    return this.eventInvites$.asObservable();
  }
  public loadBoards(userId: string) {
    this.store.dispatch(new BoardActions.LoadBoards({userId}));
  }
  public loadBoardInvites(userId: string) {
    this.store.dispatch(new BoardActions.LoadBoardInvites({userId}));
  }
  public addBoard(board: Board) {
    this.store.dispatch(new BoardActions.AddBoard({ board }));
  }
  public addUser(user: User) {
    this.store.dispatch( new BoardActions.AddBoardInvitedUser({user}));
  }
  public addParticipant(users: User[]) {
    this.store.dispatch( new BoardActions.AddUsers({users}));
  }
  public addInvited(users: User[]) {
    this.store.dispatch( new BoardActions.AddInvted({users}));
  }
  public addModerators(users: User[]) {
    this.store.dispatch( new BoardActions.AddModerators({users}));
  }
  public makeModerator(user: User) {
    this.store.dispatch( new BoardActions.AddBoardModerator({user}));
  }
  public removeUser(id: string) {
    this.store.dispatch( new BoardActions.RemoveUser({ id} ));
  }
  public removeModerator(id: string) {
    this.store.dispatch( new BoardActions.RemoveModerator({ id} ));
  }
  public editBoard(board: Board) {
    this.store.dispatch( new TimeGridActions.EditBoard({ board} ));
  }
  public accept (board: Board) {
    this.store.dispatch( new BoardActions.AcceptBoard({board}));
  }
  public decline (board: Board) {
    this.store.dispatch( new BoardActions.DeclineBoard({board}));
  }
  public loadEventInvites (userId: string) {
    this.store.dispatch(new BoardActions.LoadEventInvites({userId}));
  }

}
 */