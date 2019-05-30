import {browser, by, element} from 'protractor';

export class BoardsPage {
  public boardsBlocks = element(by.css('.boards-container--board'));

  navigateTo() {
    return browser.get('/boards');
  }
}
