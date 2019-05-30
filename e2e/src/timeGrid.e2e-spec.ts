import { TimeGridBoardPage } from './pages/timeGridBoard.po';
import { EventModifierPage } from './pages/eventModifire.po';

import { browser, by, element} from 'protractor';
import { EventPage } from './pages/event.po';
import { Auth } from './auth/auth';

describe('TimeGrid page', () => {
  let page: TimeGridBoardPage;
  let eventPage: EventPage;
  const date = new Date();
  const auth = new Auth();

  beforeAll(() => {
    auth.logIn();
    page = new TimeGridBoardPage();
    eventPage = new EventPage();
    page.navigateTo();
  });
  beforeEach(() => {
   page.navigateTo();

  });
  afterAll(() => {
    auth.logOut();
  });

  it('should be valid title', () => {
    page.getPageTitle().then((title: string) => {
      expect(title).toEqual('Board');
    });
  });
  it('should be 24 table rows ', () => {
    expect(page.hoursBlocks.count()).toBe(24);
  });
  it('add button should be visible ', () => {
    const addButton = element(by.css('.add-icon-wrapper')).element(by.css('button'));
    expect(addButton.isDisplayed()).toBe(true);
  });
  it('open dialog window after click ', () => {
    page.eventBlocks.first().click();
    browser.driver.sleep(1000);
    expect(eventPage.eventWindow.isDisplayed()).toBe(true);
  });
  it('EDIT: open edit window', () => {
    page.eventBlocks.first().click();
    browser.sleep(1000);
    eventPage.editButton.click();
    expect(eventPage.editDialog.isDisplayed()).toBe(true);
    browser.sleep(1000);
    eventPage.closeWindowButton.click();
    browser.sleep(1000);
    expect(eventPage.editDialog.isPresent()).toBe(false);
  });
  it('go to previous week button should be visible ', () => {
    expect(page.goToPreviousWeekButton.isDisplayed()).toBe(true);
  });
  it('go to next week button should be visible ', () => {
    expect(page.goToPreviousWeekButton.isDisplayed()).toBe(true);
  });
  it('add button should be visible ', () => {
    const addButton = element(by.css('.add-icon-wrapper')).element(by.css('button'));
    expect(addButton.isDisplayed()).toBe(true);
  });

  it('should be valid column headers content', () => {
    expect(page.dateTemplate.getText()).toEqual(
      page.getDatePeriod(date.getDay() - 1).monday + ' - ' + page.getDatePeriod(date.getDay() - 1).friday);
    const week = page.getCurrentDate(date.getDay() - 1);
    expect(page.daysColumnHeader.get(0).getText()).toEqual('Monday / ' + week.monday);
    expect(page.daysColumnHeader.get(1).getText()).toEqual('Tuesday / ' + week.tuesday);
    expect(page.daysColumnHeader.get(2).getText()).toEqual('Wednesday / ' + week.wednesday);
    expect(page.daysColumnHeader.get(3).getText()).toEqual('Thursday / ' + week.thursday);
    expect(page.daysColumnHeader.get(4).getText()).toEqual('Friday / ' + week.friday);
  });
  it('should be valid column headers content (previous week)', () => {
    page.goToPreviousWeekButton.click();

    expect(page.dateTemplate.getText()).toEqual(
      page.getDatePeriod(date.getDay() + 6).monday + ' - ' + page.getDatePeriod(date.getDay() + 6).friday);
    const week = page.getCurrentDate(date.getDay() + 6);
    expect(page.daysColumnHeader.get(0).getText()).toEqual('Monday / ' + week.monday);
    expect(page.daysColumnHeader.get(1).getText()).toEqual('Tuesday / ' + week.tuesday);
    expect(page.daysColumnHeader.get(2).getText()).toEqual('Wednesday / ' + week.wednesday);
    expect(page.daysColumnHeader.get(3).getText()).toEqual('Thursday / ' + week.thursday);
    expect(page.daysColumnHeader.get(4).getText()).toEqual('Friday / ' + week.friday);
  });
  it('should be valid column headers content (next week)', () => {
    page.goToNextWeekButton.click();
    expect(page.dateTemplate.getText()).toEqual(
      page.getDatePeriod(date.getDay() - 8).monday + ' - ' + page.getDatePeriod(date.getDay() - 8).friday + ', ' + date.getFullYear());
    const week = page.getCurrentDate(date.getDay() - 8);
    expect(page.daysColumnHeader.get(0).getText()).toEqual('Monday / ' + week.monday);
    expect(page.daysColumnHeader.get(1).getText()).toEqual('Tuesday / ' + week.tuesday);
    expect(page.daysColumnHeader.get(2).getText()).toEqual('Wednesday / ' + week.wednesday);
    expect(page.daysColumnHeader.get(3).getText()).toEqual('Thursday / ' + week.thursday);
    expect(page.daysColumnHeader.get(4).getText()).toEqual('Friday / ' + week.friday);
    page.goToPreviousWeekButton.click();

  });

  describe('Delete event', () => {
    let eventModifierPage: EventModifierPage;
    beforeAll(() => {
      page = new TimeGridBoardPage();
      eventPage = new EventPage();
      eventModifierPage = new EventModifierPage();
      page.navigateTo();
    });
    beforeEach(() => {
      page.navigateTo();
      browser.sleep(1000);
      page.addEventButton.click();
      browser.driver.sleep(1000);
      eventModifierPage.nameInput.sendKeys('Name');
      eventModifierPage.descriptionInput.sendKeys('Description');
      eventModifierPage.submitButton.click();
    });
    it('DELETE: click delete button', () => {
      browser.driver.sleep(1000);
      page.eventBlocks.first().click();
      let numb;
      page.eventBlocks.count().then((num: number) => {
        numb = num;
      });
      browser.sleep(1000);
      eventPage.deleteButton.click();
      page.eventBlocks.count().then((num: number) => {
        expect(num).toBe(numb - 1);
      });
    });
  });
});

