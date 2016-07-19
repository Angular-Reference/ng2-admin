import {Component, EventEmitter} from '@angular/core';
import {TimesheetModel, TimesheetModelOne, DayToPick, TimeToPick,
  Activity, ActivityEvent, WhatEvent} from './../timesheetService';

@Component({
  selector : 'activity-editor',
  providers: [TimesheetModel],
  directives: [],
  styleUrls: ['./activityEditor.css'],
  templateUrl: './activityEditor.html'
})

export class ActivityEditor {

  timesheets: TimesheetModelOne;

  constructor(timesheetModel : TimesheetModel) {
    this.timesheets = timesheetModel.getTimesheets();
    this.timesheets.activityEvent.subscribe( ae => this.editActivity(ae));
  }

  editActivity(ae: ActivityEvent) {
  }
}
