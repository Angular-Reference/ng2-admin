import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router, ActivatedRoute }       from '@angular/router';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy   {
  @Input() hero: Hero;

  private sub: any;

  // constructor(
  //   private _heroService: HeroService,
  //   private _routeParams: RouteParams) {
  // }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService) {}


  // ngOnInit() {
  //   let id = +this._routeParams.get('id');
  //   this._heroService.getHero(id)
  //     .then(hero => this.hero = hero);
  //
  //
  // }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.service.getHero(id).then(hero => this.hero = hero);

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  goBack() {
    window.history.back();

    // { this.router.navigate(['herohome/heroes']); }
  }
}



