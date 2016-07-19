import {Component} from '@angular/core';
import {DatePicker} from './datePicker/datePicker';
import {DayDetails} from './dayDetails/dayDetails';

// Timesheet user
// TODO: should live in another file ?
class User {
  constructor( public sin: number, public name: string) {
  }
}

@Component({
  selector: 'time-sheet',
  pipes: [],
  providers: [],
  directives: [DatePicker, DayDetails],
  styleUrls: ['./timesheet.css'],
  templateUrl: './timesheet.html'
})

export class Timesheet {
  user : User;

  constructor() {
    // just one user for now
    this.user = new User( 1, 'Arya Stark');
  }

  ngOnInit() {

  }

}
