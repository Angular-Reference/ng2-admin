import {Component, EventEmitter} from '@angular/core';
import {TimesheetModel, TimesheetModelOne, DayToPick, TimeToPick,
  Activity, ActivityEvent, WhatEvent} from './../../timesheetService';

@Component({
  selector : 'activity-panel',
  providers: [TimesheetModel],
  directives: [],
  styleUrls: ['./activityPanel.css'],
  templateUrl: './activityPanel.html',
  inputs: ['start', 'day']
})

export class ActivityPanel {

  timesheets: TimesheetModelOne;
  day : DayToPick;
  start : TimeToPick;
  height : string = '22px';
  paddingTop : string = '0px';
  paddingBottom : string = '0px';

  constructor(timesheetModel : TimesheetModel) {
    this.timesheets = timesheetModel.getTimesheets();
    this.timesheets.activityEvent.subscribe( ae => this.activityHappens(ae));
  }

  activityHappens(ae: ActivityEvent) {

    if (ae.event !== WhatEvent.Add) {
      return;
    }

    function pixelValue (pixels: number) : string {
      return '' + pixels + 'px';
    }

    if (!DayToPick.same(this.day, ae.activity.day)) {
      return;
    }

    if (this.start.quarterValue() !== ae.activity.from.quarterValue()) {
      return;
    }

    let slots = ae.activity.to.quarterValue() - this.start.quarterValue();
    if (slots > 0) {
      // we can be a bit more generous with vertical spacing
      this.height = pixelValue(24*slots);
      this.paddingTop = pixelValue(10);
      this.paddingBottom = pixelValue(10);
    }
  }
}
