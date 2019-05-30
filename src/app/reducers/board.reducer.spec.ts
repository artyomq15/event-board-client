/* import { reducer, initialState } from './board.reducer';
import {BoardState} from './board.reducer';
import * as BoardActions from '../actions/board.actions';
import * as mock from '../../testing/mock';


describe('Board reducer', () => {

  let state: BoardState;

  beforeEach(() => {
    state = undefined;
  });

  describe('undefined action', () => {
    it('should return default state', () => {
      state = reducer(state, {} as BoardActions.Actions);
      expect(state).toEqual(initialState);
    });
  });
  describe('Load boards action', () => {
    it('should return valid state', () => {
      sessionStorage.setItem('_id', '1');

      state = reducer(state, new BoardActions.LoadBoardsSuccess({boards: [mock.board]}));

      expect(state).toEqual({
        ...initialState,
        boards: [mock.board],
        boardInvites: []
      });
      sessionStorage.clear();
    });
  });

  describe('Load board invites action', () => {
    it('should return valid state', () => {
      sessionStorage.setItem('_id', '1');

      state = reducer(state, new BoardActions.LoadBoardInvitesSuccess({boards: [mock.board]}));

      expect(state).toEqual({
        ...initialState,
        boardInvites: [mock.board]
      });
      sessionStorage.clear();
    });

    it('should return valid state', () => {
      sessionStorage.setItem('_id', '1');

      state = reducer(state, new BoardActions.LoadBoardInvitesFail({boards: []}));

      expect(state).toEqual({
        ...initialState,
        boardInvites: []
      });
      sessionStorage.clear();
    });
  });

  describe('Add board user action', () => {
    it('should return valid state', () => {

      state = reducer(state, new BoardActions.AddBoardInvitedUser({user: mock.user}));

      expect(state).toEqual({
        ...initialState,
        invited: [mock.user]
      });

      state = reducer(state, new BoardActions.AddBoardInvitedUser({user: null}));

      expect(state).toEqual({
        ...initialState,
        invited: []
      });
    });
  });
  describe('Remove board user action', () => {
    it('should return valid state', () => {
      state = reducer(state, new BoardActions.RemoveUser({id: '1'}));

      expect(state).toEqual({
        ...initialState,
        invited: []
      });
    });
  });
  describe('Add board moderator action', () => {
    it('should return valid state', () => {
      state = reducer(state, new BoardActions.AddBoardModerator({user: mock.user}));

      expect(state).toEqual({
        ...initialState,
        moderators: [mock.user]
      });

    });
  });
  describe('Remove board moderator action', () => {
    it('should return valid state', () => {
      state = reducer(state, new BoardActions.RemoveModerator({id: '1'}));

      expect(state).toEqual({
        ...initialState,
        moderators: []
      });
    });
  });
  describe('Add board participants action', () => {
    it('should return valid state', () => {
      state = reducer(state, new BoardActions.AddUsers({users: [mock.user]}));

      expect(state).toEqual({
        ...initialState,
        participants: [mock.user]
      });

      state = reducer(state, new BoardActions.AddUsers({users: null}));

      expect(state).toEqual({
        ...initialState,
        participants: []
      });
    });
  });
  describe('Add board invited users action', () => {
    it('should return valid state', () => {
      state = reducer(state, new BoardActions.AddInvted({users: [mock.user]}));

      expect(state).toEqual({
        ...initialState,
        invited: [mock.user]
      });

      state = reducer(state, new BoardActions.AddInvted({users: null}));

      expect(state).toEqual({
        ...initialState,
        invited: []
      });
    });
  });
  describe('Add board moderators action', () => {
    it('should return valid state', () => {
      state = reducer(state, new BoardActions.AddModerators({users: [mock.user]}));

      expect(state).toEqual({
        ...initialState,
        moderators: [mock.user]
      });

      state = reducer(state, new BoardActions.AddModerators({users: null}));

      expect(state).toEqual({
        ...initialState,
        moderators: []
      });
    });
  });
  describe('Accept board action', () => {
    it('should return valid state', () => {

      state = reducer(state, new BoardActions.AcceptBoardSuccess({board: mock.board}));

      expect(state).toEqual({
        ...initialState,
        boardInvites: [],
        boards: [mock.board]
      });
    });
  });
  describe('Decline board action', () => {
    it('should return valid state', () => {
      state = reducer(state, new BoardActions.DeclineBoardSuccess({board: mock.board}));
      expect(state).toEqual({
        ...initialState,
        boardInvites: [],
      });
    });
  });
});
 */