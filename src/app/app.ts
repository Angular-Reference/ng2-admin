import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CONSTANTS, NavbarComponent } from './shared';
@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [ NavbarComponent, ROUTER_DIRECTIVES ],
  // templateUrl: './app.html'
  template: require('./app.html')

})
export class App {
  public appBrand: string;

  constructor() {
    this.appBrand = CONSTANTS.MAIN.APP.BRAND;
  }

}
