import { Routes } from '@angular/router';
import { User, Board, Event } from 'src/app/store/domain/interfaces';
import { BoardsComponent } from 'src/app/components/boards/boards.component';
import { BoardComponent } from 'src/app/components/boards/board/board.component';
import { TokenNotExistsGuard } from 'src/app/services/guards/token-not-exists.guard';

export const user: User = {
  id: '1',
  name: 'name',
  email: 'email@mail.ru',
  password: 'pass'

};

export const date =  {
    from: new Date(2018, 9, 10, 10, 0),
    to: new Date(2018, 9, 10, 10, 30)
};

export const WeekDate =  {
  from: new Date(2018, 9, 8, 0, 0),
  to: new Date(2018, 9, 13, 0, 0)
};


export const board: Board = {
  id: '1',
  name: 'name',
  isPrivate: false,
  creator: user,
  moderators: [],
  participants: [user],
  invited: []
};

export const event: Event = {
  id: '1',
  name: 'name',
  description: 'description',
  timeFrom: date.from,
  timeTo: date.to,
  color: '#ffffff',
  creator: user,
  participants: [user],
  invited: [],
  board: board
};

export const token = { token: '111111111111111111111111111111111111111111111111' } ;
export const mockDataNull = null;
export const mockTokenNull =  {token: null};

export const routesForBoards: Routes = [
  { path: 'boards', component: BoardsComponent, canActivate: [TokenNotExistsGuard]}
];
export const routesForEvent: Routes = [
];
export const routesForBoard: Routes = [
  { path: 'boards/:id', component: BoardComponent, canActivate: [TokenNotExistsGuard] },
];
