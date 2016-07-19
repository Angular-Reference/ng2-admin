/**
 * Created by michael.liu on 12/07/2016.
 */
// Promise Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Hero }           from './hero';


let HEROES: Hero[] = [
  { 'id': 11, 'name': 'Mr. Nice Another' },
  { 'id': 12, 'name': 'Narco Another' },
  { 'id': 13, 'name': 'Bombasto Another' },
  { 'id': 14, 'name': 'Celeritas Another' },
  { 'id': 15, 'name': 'Magneta Another' },
  { 'id': 16, 'name': 'RubberMan Another' },
  { 'id': 17, 'name': 'Dynama Another' },
  { 'id': 18, 'name': 'Dr IQ Another' },
  { 'id': 19, 'name': 'Magma Another' },
  { 'id': 20, 'name': 'Tornado Another' }
];

import {XHRBackend} from '@angular/http';
import {
  InMemoryBackendService,
  SEED_DATA
}  from 'angular2-in-memory-web-api';
import {HeroData}   from './hero-data';
import {HeroService} from "./hero.service";

@Injectable()
export class HeroServicePromise extends HeroService{
  // URL to web api
  private heroesUrl = 'app/heroes';  // URL to web API
  // private heroesUrl = 'app/components/heros/heroes.json';

  constructor (private http: Http) {

    super();
  }

  getHero(id: number): Promise<Hero> {
    console.log("getHero(id: number):" , id);
    return this.http.get(this.heroesUrl).toPromise()
      .then(this.extractData)
      .then(heroes => heroes.filter(hero => hero.id == ""+id)[0])
      .catch(this.handleError);

    // return Promise.resolve(HEROES).then(
    //   heroes => heroes.filter(hero => hero.id === id)[0]
    // );


  }

  getHeroes (): Promise<Hero[]> {
    console.log("http:" , this.http);
    console.log("this.heroesUrl",this.heroesUrl);
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addHero (name: string): Promise<Hero> {
    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.heroesUrl, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();

    // body.data.forEach(hero => { console.log("...id..." + hero.id)});
    // body.data.forEach(hero => hero.name = hero.name + " promise");
    // console.log("service promise:" + body.data);
    return body.data || { };
  }

  private extractDataAndFilter(res: Response) {
    let body = res.json();

    console.log(body);
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
