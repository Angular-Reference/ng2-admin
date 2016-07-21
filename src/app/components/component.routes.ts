/**
 * Created by michael.liu on 7/20/2016.
 */
import {About} from './about/about';
import {Home} from './home/home';
import {Timesheet} from './timesheet/timesheet';
import {RepoBrowser} from './git-repo/repo-browser/repo-browser';
import {RepoList} from './git-repo/repo-list/repo-list';
import {RepoDetail} from './git-repo/repo-detail/repo-detail';

import {DashboardComponent} from "./heros/dashboard.component";
import {HeroDetailComponent} from "./heros/hero-detail.component";
import {HeroesComponent} from "./heros/heroes.component";
import {AppComponent} from "./heros/app.component";
//Sub Route Index
import {TodolistRoutes} from "./todolist/todolist.routes";
import {TicTacToe} from "./tictactoe/tic-tac-toe/tic-tac-toe";
import {RouterConfig} from "@angular/router";
import {Commons} from "./container.component";
import {HerossRoutes} from "./heros/heros.routes";

export const ComponentsRoutes:RouterConfig = [





  {path: 'components', component:Commons,
    children:[
      ...TodolistRoutes,
      ...HerossRoutes,
      {path: 'about',     component: About},
    ]},

  {path: '',          component: Home},
  {path: 'timesheet', component: Timesheet},

  {path: 'github', component: RepoBrowser,
    children: [
      {path: ':org', component: RepoList,
        children: [
          {path: ':repo', component: RepoDetail},
          {path: '', component: RepoDetail}
        ]
      },
      {path: '', component: RepoList}
    ]
  },
  {path: 'tictactoe', component: TicTacToe}
];
