import {  by, element } from 'protractor';

export class EventPage {
  public closeWindowButton = element(by.css('.container--close-button'));
  public editDialog = element(by.css('app-event-edit-dialog'));
  public eventWindow = element(by.css('app-event'));
  public deleteButton = element(by.css('.event-menu-btn')).all(by.css('button')).get(1);
  public editButton = element(by.css('.event-menu-btn')).all(by.css('button')).first();
}
