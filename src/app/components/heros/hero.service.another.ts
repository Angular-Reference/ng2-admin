import { Injectable } from '@angular/core';

import { Hero } from './hero';
import {HeroService} from "./hero.service";
// import { HEROES } from './mock-heroes';


export var HEROES: Hero[] = [
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


@Injectable()
export class HeroServiceAnother extends HeroService{
  getHeroes() {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id: number) {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
}
