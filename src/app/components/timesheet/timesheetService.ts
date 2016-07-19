import {Injectable, EventEmitter, Output} from '@angular/core';

const dayMillis:number = 24*60*60*1000;

// Helper class to deal with dates where only the
// day ( year / month / day of month) is relevant
export class DayToPick {

  dte: Date;
  // properties for presentation
  selected : boolean;

  constructor( dte ) {
    this.dte = dte;
  }

  static getToday() : DayToPick {
    return new DayToPick(new Date());
  }

  // step forward (or if count is negative, back) by a certain amount of
  // days
  nextDay  (count : number) : DayToPick {
    if (!count) {
      count = 1;
    }
    return new DayToPick(new Date(this.dte.getTime() + count*dayMillis));
  }

  // tells if this day is strictly before the day in the parameter
  before( dtp : DayToPick) : boolean {
    if (this.dte.getFullYear() < dtp.dte.getFullYear()) {
      return true;
    }
    if (this.dte.getFullYear() > dtp.dte.getFullYear()) {
      return false;
    }

    // stayed here if year is the same
    if (this.dte.getMonth() < dtp.dte.getMonth()) {
      return true;
    }
    if (this.dte.getMonth() > dtp.dte.getMonth()) {
      return false;
    }

    return (this.dte.getDate() < dtp.dte.getDate());
  }


  static same(dtp1:DayToPick, dtp2:DayToPick):boolean {
    if (dtp1.dte.getFullYear() !== dtp2.dte.getFullYear()) {
      return false;
    }
    if (dtp1.dte.getMonth() !== dtp2.dte.getMonth()) {
      return false;
    }
    if (dtp1.dte.getDate() !== dtp2.dte.getDate()) {
      return false;
    }
    return true;
  }
}


// Helper class for the quarter hours we deal with
export class TimeToPick {

  hour: number;
  quarter: number;

  // presentation helper flags
  selectionStarter : boolean;  // between the first and second mouse click of making a selection
  inActivity : boolean;  // part of an interval selected for an activity
  activityTop : boolean;
  selectable : boolean;

  constructor(hour:number, quarter:number) {
    this.quarter = quarter;
    this.hour = hour;

    this.selectionStarter = false;
    this.inActivity = false;
    this.activityTop = false;
    this.selectable = true;

    if (quarter >= 4) {
      let quarterNew = quarter % 4;
      this.hour += Math.floor((quarter - quarterNew) / 4);
      this.quarter = quarterNew;
    }
  }

  nextQuarter() : TimeToPick {
    return new TimeToPick(this.hour, this.quarter+1);
  }

  toString() : string {
    let retval : string = '' + this.hour;
    if (this.quarter > 0) {
      retval += ':' + (15*this.quarter);
    }
    return retval;
  }

  quarterValue() : number {
    return 4*this.hour + this.quarter;
  }

  // is the object between to other times (or one of them)?
  between( ttp1, ttp2) : boolean {
    let q1 : number = ttp1.quarterValue();
    let q2 : number = ttp2.quarterValue();
    let qthis : number = this.quarterValue();
    if (q1 < q2) {
      return (q1 <= qthis && qthis <= q2);
    } else {
      return (q2 <= qthis && qthis <= q1);
    }
  }
}

// Class for the activity entries that make a timesheet
export class Activity {
  activity: string;

  constructor( public  day: DayToPick,
               public from: TimeToPick, public to: TimeToPick) {
      this.activity = 'Not entered yet';
      if (this.to.quarterValue() < this.from.quarterValue()) {
        // the two values need to change place
        [this.from, this.to ] = [this.to, this.from];
      }
  }

  isInside(time : TimeToPick) : boolean {
    if (time.quarterValue() < this.from.quarterValue()) {
      return false;
    }
    if (time.quarterValue() > this.to.quarterValue()) {
      return false;
    }
    return true;
  }
}

// A day's activity list
export class ActivitiesForDay {
  activities : Activity[];

  constructor(public day : DayToPick) {
    this.activities = [];
  }

  public addActivity(activity: Activity) {
    this.activities.push(activity);
  }
}

export enum WhatEvent {Add, Edit, Delete}

export class ActivityEvent {
  constructor(public event: WhatEvent, public activity: Activity) {}
}


/**
 * The info shared by the components of the timesheet application
 */
export class TimesheetModelOne {
  activitiesForDays: ActivitiesForDay[];
  public status: { daySelected : DayToPick};
  daySelectedEvent : EventEmitter<DayToPick>;
  activityEvent : EventEmitter<ActivityEvent>;

  constructor () {
    this.activitiesForDays = [];
    this.status = {
      daySelected: new DayToPick(new Date())
    }
    this.daySelectedEvent = new EventEmitter<DayToPick>();
    this.activityEvent = new EventEmitter<ActivityEvent>();
  }

  getActivitiesForDay(day : DayToPick) : ActivitiesForDay {
    let activities : ActivitiesForDay = null;
    for (let activityList of this.activitiesForDays) {
      if (DayToPick.same(activityList.day, day)) {
        activities = activityList;
      }
    }
    return activities;
  }

  addActivity(activity: Activity) {
    // find out if we already have an activity list for the day of the activity
    let activities : ActivitiesForDay = this.getActivitiesForDay(activity.day);
    if (!activities) {
      activities = new ActivitiesForDay(activity.day);
      this.activitiesForDays.push(activities);
    }
    activities.addActivity(activity);
    this.activityEvent.emit(new ActivityEvent(WhatEvent.Add, activity));
  }

  selectDay(dayToSelect : DayToPick) {
    this.status.daySelected = dayToSelect;
    this.daySelectedEvent.emit(dayToSelect);
  }
}

@Injectable()
export class TimesheetModel {
  private static ts : TimesheetModelOne;

  getTimesheets() {
    if (!TimesheetModel.ts) {
      TimesheetModel.ts = new TimesheetModelOne();
    }
    return TimesheetModel.ts;
  }
}
