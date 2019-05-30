import { Observable, BehaviorSubject } from 'rxjs';
import { User, Board } from 'src/app/store/domain/interfaces';

export class BoardStoreServiceStub {

  private boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  private boardInvites$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  private invited$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private moderators$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private participants$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private eventInvites$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

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
  public loadBoards(userId: string) {}

  public loadBoardInvites(userId: string) {}

  public addBoard(board: Board) {}

  public addUser(user: User) {}

  public addParticipant(users: User[]) {}

  public addInvited(users: User[]) {}

  public addModerators(users: User[]) {}

  public makeModerator(user: User) {}

  public removeUser(id: string) {}

  public removeModerator(id: string) {}

  public editBoard(board: Board) {}

  public accept (board: Board) {}

  public decline (board: Board) {}

  public loadEventInvites (userId: string) {}

}
