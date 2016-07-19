import {Component, ViewEncapsulation} from '@angular/core';
import {Http} from '@angular/http';


// when jquery in typings
// import $ = require('jquery');
// import {doesSomething} from "my-module";



@Component({
  selector: 'about',
  pipes: [],
  providers: [],
  directives: [],
  styles:[require('./about.css')],
  template:require('./about.html')
  // encapsulation: ViewEncapsulation.None
  // styleUrls: ['./about.css'],
  // templateUrl: './about.html'
})
export class About {

  jsonData:string;

  constructor(http: Http) {

  }

  ngOnInit() {

  }

  getJ(){
    jQuery.getJSON("/mock_data/example.json",function (data) {

      console.log(data);

    })

    jQuery.getJSON("/mock_data/example.json", (data) => this.jsonData = JSON.stringify(data));
  }
}
