import {browser, by, element} from 'protractor';
import { DatePipe } from '@angular/common';

export class TimeGridBoardPage {
  public Week = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null
  };
  public daysColumnHeader = element(by.css('.container--grid')).all(by.css('.week-day-name'));
  public goToPreviousWeekButton = element(by.css('.container--date-period')).all(by.css('button')).first();
  public goToNextWeekButton = element(by.css('.container--date-period')).all(by.css('button')).last();
  public dateTemplate = element(by.css('.date-period--text'));
  public hoursBlocks =  element(by.css('.container--grid')).all(by.css('.container--hours-block'));
  public eventBlocks = element.all(by.css('.event'));
  public addEventButton = element(by.css('.add-icon-wrapper button'));

  navigateTo() {
    return browser.get('/boards/my', 20000);
  }
  getPageTitle() {
    return browser.getTitle();
  }
  private getInputByFormControl(name: string) {
    return element(by.css(`app-event-modifier input[formControlName=${name}]`));
  }
   getCurrentDate(coefficient: number) {
   let currentDate = new Date();
   let datePipe = new DatePipe('en-US');
   this.Week.monday = datePipe.transform(currentDate.setDate(currentDate.getDate() - coefficient), 'MMM, d');
   this.Week.tuesday = datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'MMM, d');
   this.Week.wednesday = datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'MMM, d');
   this.Week.thursday = datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'MMM, d');
   this.Week.friday = datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'MMM, d');
    return this.Week;
 }
  getDatePeriod(coefficient: number) {
    let mondayDate = new Date();
    let fridayDate = new Date();
    const datePipe = new DatePipe('en-US');
    const monday = mondayDate.getDate() - coefficient ;
    mondayDate.setDate(monday);
    fridayDate.setDate(monday + 4);
    if ( mondayDate.getMonth() !== fridayDate.getMonth() ) {
      this.Week.monday = datePipe.transform(mondayDate, 'MMMM d');
      this.Week.friday = datePipe.transform(fridayDate, 'MMMM d');
    } else {
      this.Week.monday = datePipe.transform(mondayDate, 'MMMM d');
      this.Week.friday = datePipe.transform(fridayDate, 'd, y');
    }
    return this.Week;
  }
}
