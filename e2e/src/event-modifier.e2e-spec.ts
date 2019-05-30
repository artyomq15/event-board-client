import {EventModifierPage} from './pages/eventModifire.po';
import { Auth } from './auth/auth';
import { by, browser, element } from 'protractor';
import { USER_MOCK, ANOTHER_USER_MOCK } from './mock';
import {TimeGridBoardPage} from './pages/timeGridBoard.po';
import { ClearService } from './services/clear.service';

describe('Event modifier', () => {
    const auth = new Auth();
    let page: TimeGridBoardPage;
    let eventModifierPage: EventModifierPage;
    const clearService = new ClearService();

    beforeAll(() => {
        page = new TimeGridBoardPage();
        eventModifierPage = new EventModifierPage();
        auth.logIn();
    });

    beforeEach(() => {
        page.navigateTo();
    });

    afterAll(() => {
        auth.logOut();
        clearService.clearEvents(USER_MOCK.username, USER_MOCK.password);
    });

    describe('Adding event case', () => {

        it('should open add dialog', () => {
            page.addEventButton.click();

            eventModifierPage.eventModifierHeading.getText().then((text: string) => {
                expect(text).toBe('Add event');
            });
        });

        it('should be 6 mat-form-fields', () => {
            page.addEventButton.click();

            expect(eventModifierPage.formFields.count()).toBe(6);
        });

        it('submit button should have valid content', () => {
            page.addEventButton.click();

            eventModifierPage.submitButton.getText().then((text: string) => {
                expect(text).toBe('Add');
            });
        });

        it('should add one event', () => {
            const before = page.eventBlocks.count();

            page.addEventButton.click();

            eventModifierPage.nameInput.sendKeys('Name');
            eventModifierPage.descriptionInput.sendKeys('Description');

            eventModifierPage.submitButton.click();
            browser.driver.sleep(1000);

            page.eventBlocks.count().then((num: number) => {
                expect(num - 1).toBe(before);
            });
        });
    });

    describe('All cases', () => {

        beforeEach(() => {
            page.addEventButton.click();
        });

        it('should be valid placeholders', () => {
            expect(eventModifierPage.nameInput.getAttribute('placeholder')).toBe('Name');
            expect(eventModifierPage.descriptionInput.getAttribute('placeholder')).toBe('Description');
            expect(eventModifierPage.timeFromInput.getAttribute('placeholder')).toBe('Time from');
            expect(eventModifierPage.timeToInput.getAttribute('placeholder')).toBe('Time to');
            expect(eventModifierPage.searchParticipantInput.getAttribute('placeholder')).toBe('Search particpant');
            expect(eventModifierPage.colorInput.getAttribute('placeholder')).toBe('Color');
        });

        it('name: should fail adding', () => {
          browser.sleep(5000);

          eventModifierPage.nameInput.sendKeys('');
          eventModifierPage.descriptionInput.sendKeys('Description');
          browser.sleep(1000);

          eventModifierPage.submitButton.click();

          element(by.css('mat-error')).getText().then((text: string) => {
                expect(text).toEqual('Name is required');
            });
        });

        it('description: should fail adding', () => {
          eventModifierPage.nameInput.sendKeys('Name');
          eventModifierPage.descriptionInput.sendKeys('');

          eventModifierPage.submitButton.click();
          eventModifierPage.formFields.get(1).element(by.css('mat-error')).getText().then((text: string) => {
                expect(text).toEqual('Description is required');
            });
        });

        it('time from: should fail adding', () => {

            browser.driver.sleep(600);

          eventModifierPage.nameInput.sendKeys('Name');
          eventModifierPage.descriptionInput.sendKeys('Description');

          eventModifierPage.timeFromInput.sendKeys('09/10/2018\t11:00AM');
          eventModifierPage.timeToInput.sendKeys('09/10/2018\t10:00AM');

          eventModifierPage.submitButton.click();

            element(by.css('.form--item mat-error')).getText().then((text: string) => {
                expect(text).toEqual('Time to must be later than time from');
            });

        });

        it('should display participant hint block', () => {
            expect(eventModifierPage.participantsHint.isPresent()).toBeFalsy();
          eventModifierPage.searchParticipantInput.sendKeys(USER_MOCK.firstName);
            expect(eventModifierPage.participantsHint.isDisplayed()).toBeTruthy();
        });

        it('should add and delete participant', () => {
          eventModifierPage.searchParticipantInput.sendKeys(ANOTHER_USER_MOCK.firstName);
            expect(eventModifierPage.participantsHint.isDisplayed()).toBeTruthy();

            const before = eventModifierPage.addedParticipants.count();
          eventModifierPage.participants.first().click();

          eventModifierPage.addedParticipants.count().then((num: number) => {
                expect(num - 1).toBe(before);
            });

          eventModifierPage.deleteParticipantButton.click();

          eventModifierPage.addedParticipants.count().then((num: number) => {
                expect(num).toBe(before);
            });
        });

    });
});
