import {Component, EventEmitter} from '@angular/core';
import {TimesheetModel, TimesheetModelOne, DayToPick, TimeToPick, Activity} from './../timesheetService';
import {ActivityPanel} from './activityPanel/activityPanel';

@Component({
  selector: 'day-details',
  pipes: [],
  providers: [TimesheetModel],
  directives: [ActivityPanel],
  styleUrls: ['./dayDetails.css'],
  templateUrl: './dayDetails.html'
})

export class DayDetails {

  timesheets: TimesheetModelOne;
  displayed : TimeToPick[];  // the time slots presented
  selectionStarter : TimeToPick;

  constructor(public timesheetModel : TimesheetModel) {
    this.timesheets = timesheetModel.getTimesheets();
    // listening to day selection change coming from the date picker
    this.timesheets.daySelectedEvent.subscribe( day => {
      this.startDay(day);
    });
    this.startDay(this.timesheets.status.daySelected);
  }

  // set up the list of the presented time slots
  createDisplayed(){
    this.displayed = [];

    let lastPushed =  new TimeToPick(9,0);
    while (lastPushed.hour < 11) {
      this.displayed.push(lastPushed);
      lastPushed = lastPushed.nextQuarter();
    }
  }

  startDay(day: DayToPick) {
    this.createDisplayed();
    this.selectionStarter = null;
    let activities = this.timesheets.getActivitiesForDay(this.timesheets.status.daySelected);
    if (!activities) {
      return;
    }
    for (let dq of this.displayed) {
      for (let activity of activities.activities) {
        if (activity.isInside(dq)) {
          dq.inActivity = true;
          if (dq.quarterValue() === activity.from.quarterValue()) {
            dq.activityTop = true;
          }
        }
      }
    }
  }

  // user clicked on a time slot
  quarterClicked(quarter) {
    if (quarter.inActivity) {
      // already spoken for
      return;
    }
    if (!this.selectionStarter) {
      // this is the first click for the time stretch selection
      quarter.selectionStarter = true;
      quarter.activityTop = true;
      this.selectionStarter = quarter;
      for (quarter of this.displayed) {
        quarter.selectable = true;
      }
      this.markForSelectable();
    } else {
      // second mouse click to complete time interval selection
      if (!quarter.selectable) {
        return;
      }
      let newActivity = new Activity( this.timesheets.status.daySelected, this.selectionStarter, quarter);
      for ( let qd of this.displayed) {
        qd.selectionStarter = false;
        if (newActivity.isInside(qd)) { // adjust display properties of the time slots inside the selection
          qd.inActivity = true;
          qd.activityTop = false;
          if (newActivity.from.quarterValue() == qd.quarterValue()) {
            qd.activityTop = true;
          }
        }
      }
      this.selectionStarter = null;
      this.timesheets.addActivity(newActivity);
      this.allSelectable();
    }
  }

  allSelectable() {
    for ( let qd of this.displayed) {
        qd.selectable = true; // cursor type styling and actual selection logic will considet the inActivity flag
                              // as well
      }
  }

  // after starting a new selection turn off the selectable flags necessary to prevent the selection
  // from overlapping other activity selections
  markForSelectable() {
    let activities = this.timesheets.getActivitiesForDay(this.timesheets.status.daySelected);
    if (activities) {
      let minQ :number = -90000;  // a.k.a Incredibly Small
      let maxQ = 90000;  // a.k.a Incredibly Big
      for ( let act of activities.activities) {  // the stored activities of the day
        if ( act.to.quarterValue() < this.selectionStarter.quarterValue()) {
          // An activity supposedly before the prospective one, we can't go lower than its start time
          if ( minQ < act.to.quarterValue()) {
            minQ = act.to.quarterValue();
          }
        } else {
          // activity is after the picked starter
          if ( maxQ > act.from.quarterValue()) {
            maxQ = act.from.quarterValue();
          }
        }
      }
      for ( let qd of this.displayed) {
        if (qd.quarterValue() < minQ) {
          qd.selectable = false;
        }
        if (qd.quarterValue() > maxQ) {
          qd.selectable = false;
        }
      }
    }
  }

  // day selection controls on the  top
  prevDay() {
    this.timesheets.selectDay( this.timesheets.status.daySelected.nextDay(-1));
  }

  nextDay() {
    this.timesheets.selectDay( this.timesheets.status.daySelected.nextDay(1));
  }
}
