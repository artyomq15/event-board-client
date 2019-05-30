import { browser, element, by } from 'protractor';

export class EventModifierPage {

    public eventModifierHeading = element(by.css('app-event-modifier h3'));
    public formFields = element.all(by.css('app-event-modifier mat-form-field'));
    public submitButton = element(by.css('app-event-modifier .submit--button'));
    public participantsHint = element(by.css('.participants-container--hint'));
    public participants = this.participantsHint.all(by.css('.hint--user'));
    public addedParticipants = element.all(by.css('.added--participant'));
    public deleteParticipantButton = this.addedParticipants.last().element(by.css('button'));
    public nameInput = this.getInputByFormControl('name');
    public descriptionInput = element(by.css('app-event-modifier textarea[formControlName=description]'));
    public timeFromInput = this.getInputByFormControl('timeFrom');
    public timeToInput = this.getInputByFormControl('timeTo');
    public searchParticipantInput = element(by.css('#search-participant'));
    public colorInput = this.getInputByFormControl('color');

    navigateTo() {
        return browser.get('/boards/my', 20000);
    }

    private getInputByFormControl(name: string) {
        return element(by.css(`app-event-modifier input[formControlName=${name}]`));
    }
}
