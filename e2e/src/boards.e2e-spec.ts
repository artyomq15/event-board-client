import { Auth } from './auth/auth';
import {BoardsPage} from './pages/boards.po';
import { ClearService } from './services/clear.service';
import { USER_MOCK } from './mock';

describe('Boards', () => {
  const auth = new Auth();
  let page: BoardsPage;
  let clearService: ClearService;

  beforeAll(() => {
    page = new BoardsPage();
    auth.logIn();
  });

  beforeEach(() => {
    page.navigateTo();
  });
  afterAll(() => {
    auth.logOut();
    clearService = new ClearService();
    clearService.clearBoards(USER_MOCK.username, USER_MOCK.password);
  });
  describe('Adding event case', () => {

    it('should open add dialog', () => {
      });
    });
  });

