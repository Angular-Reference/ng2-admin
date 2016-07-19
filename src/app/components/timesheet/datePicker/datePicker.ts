import {Component} from '@angular/core';
import {TimesheetModel, TimesheetModelOne, DayToPick} from './../timesheetService';

/**
 * Date picker component for the time sheet. Displays the last week back from the current date and two days ahead.
 *
 * Controls to roll a day back and forth or to roll to the beginning of previous / next week.
 *
 * Different style for the day selected to display in the main panel with the time sheet details. Clicking on a day
 * results in selecting that day as the one to work on.
 *
 * Listens to changes in selected day coming from the timesheet model to make sure that the day selected
 * there is visible.
 */

const listSize = 10;

@Component({
  selector: 'date-picker',
  pipes: [],
  providers: [TimesheetModel],
  directives: [],
  styleUrls: ['./datePicker.css'],
  templateUrl: './datePicker.html'
})

export class DatePicker {

  lastSelected : DayToPick;
  displayed : DayToPick[];
  timesheets : TimesheetModelOne;
  
  constructor(public timesheetModel: TimesheetModel) {
    this.timesheets = timesheetModel.getTimesheets();
    this.timesheets.daySelectedEvent.subscribe( day => {
        console.log('handler from picker');
        this.markSelected();
      });
    this.lastSelected = DayToPick.getToday();
    this.timesheets.status.daySelected = this.lastSelected;
    this.fillDisplayed(this.lastSelected.nextDay(-7));
  };

  ngOnInit() {

  }

  fillDisplayed(listTop: DayToPick){
    this.displayed = [];
    let i=0;
    let current = listTop;
    while (i < listSize) {
      this.displayed.push(current);
      current = current.nextDay(1);
      i++;
    };
    this.markSelected();
  }

  selectDay(day) {
    console.log('at selectDay click', this.timesheets.status);
    this.timesheets.selectDay(day);
  }

  markSelected() {
    for ( let day of this.displayed) {
      day.selected = DayToPick.same(day, this.timesheets.status.daySelected);
    }
  };

  dayEarlier() {
    this.fillDisplayed((this.displayed[0]).nextDay(-1));
  }

  dayLater() {
    this.fillDisplayed((this.displayed[0]).nextDay(1));
  }
}
