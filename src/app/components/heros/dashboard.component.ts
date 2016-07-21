import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  template: require('./dashboard.component.html'),
  styles: [require('./dashboard.component.css')]
})


export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private _router: Router,
    private _heroService: HeroService) {
  }

  ngOnInit() {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5));
  }

  gotoDetail(hero: Hero) {
    let link = ['components/herohome/detail',  hero.id ];
    console.log(link);
    this._router.navigate(link);
  }
}
