import {Component} from '@angular/core';
//noinspection TypeScriptCheckImport
import {ROUTER_DIRECTIVES} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail.component';
// import { HeroService } from './hero.service';
import {HeroService} from './hero.service';
import {HeroServiceAnother} from './hero.service.another';
import {HeroServiceObservable} from './hero.service.observable';
// Imports for loading & configuring the in-memory web api
import {XHRBackend, BaseRequestOptions, Http} from '@angular/http';
import {
  InMemoryBackendService,
  SEED_DATA
}  from 'angular2-in-memory-web-api';

import {HTTP_PROVIDERS} from '@angular/http';



import {HeroData}   from './hero-data';
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';
import {LoggerService} from "./logger.service";
import {HeroServicePromise} from "./hero.service.promise";



@Component({
  selector: 'hero-app',
  template: `

    <div class="al-main">
      <div class="al-content">
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['dashboard']">Dashboard</a>
      <a [routerLink]="['heroes']">Heroes</a>
    </nav>      
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://akveo.com">Akveo</a> 2016</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>

  `,
  styles: [require('./app.component.css')],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    // {provide: HeroService, useClass: HeroServiceAnother}
     {provide: HeroService, useClass: HeroServicePromise}
     ,HTTP_PROVIDERS //it will influce all the below components
     ,{provide: LoggerService, useClass:LoggerService}
    ,{provide: XHRBackend, useClass: InMemoryBackendService} // in-mem server
    ,{provide: SEED_DATA, useClass: HeroData}
    //
    // ,{provide: Http, useFactory: (backend, options) => {
    //          return new Http(backend, options);
    //        }, deps: [XHRBackend, BaseRequestOptions]}


  ]
})
// @RouteConfig([
//   {
//     path: '/dashboard',
//     name: 'Dashboard',
//     component: DashboardComponent,
//     useAsDefault: true
//   },
//   {
//     path: '/detail/:id',
//     name: 'HeroDetail',
//     component: HeroDetailComponent
//   },
//   {
//     path: '/heroes',
//     name: 'Heroes',
//     component: HeroesComponent
//   }
// ])
export class AppComponent {
  title = 'Tour of Heroes';
}
