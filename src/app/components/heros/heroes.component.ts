import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

import {NGB_DIRECTIVES} from '@ng-bootstrap/ng-bootstrap';
import {error} from "util";

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls:  ['./heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {

  errorMessage: string;
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private _router: Router,
    private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  addHero(name: string){
    if(!name){return;}
    this._heroService.addHero(name)
      .then(hero => this.heroes.push(hero),
            error => this.errorMessage = <any> error);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  gotoDetail() {
    // this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    this._router.navigate(['herohome/detail', this.selectedHero.id ]);

  }
}
