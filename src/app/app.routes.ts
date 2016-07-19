import {provideRouter, RouterConfig} from '@angular/router';
import {LoginRoutes} from "./pages/login/login.routes";
import {PagesRoutes} from "./pages/pages.routes";
import {RegisterRoutes} from "./pages/register/register.routes";


import {About} from './components/about/about';
import {Home} from './components/home/home';
import {Timesheet} from './components/timesheet/timesheet';
import {RepoBrowser} from './components/git-repo/repo-browser/repo-browser';
import {RepoList} from './components/git-repo/repo-list/repo-list';
import {RepoDetail} from './components/git-repo/repo-detail/repo-detail';
import {App} from "./app";
import {DashboardComponent} from "./components/heros/dashboard.component";
import {HeroDetailComponent} from "./components/heros/hero-detail.component";
import {HeroesComponent} from "./components/heros/heroes.component";
import {AppComponent} from "./components/heros/app.component";
//Sub Route Index
import {TodolistRoutes} from "./components/todolist/todolist.routes";
import {TicTacToe} from "./components/tictactoe/tic-tac-toe/tic-tac-toe";
import {AppNg2Admin} from "./app.component";



export const routes:RouterConfig = [
  ...LoginRoutes,
  ...RegisterRoutes,
  ...PagesRoutes,
  // {
  //   path: '**',
  //   redirectTo: '/pages/dashboard'
  // },

  ...TodolistRoutes,

  {
    path: 'herohome',
    component: AppComponent, children: [
    {
      path: 'dashboard',
      component: DashboardComponent
      // useAsDefault: true
    },
    {
      path: 'detail/:id',
      component: HeroDetailComponent
    },
    {
      path: 'heroes',
      component: HeroesComponent
    }
    ,
    {path: '', component: DashboardComponent}
  ]
    // useAsDefault: true
  },


  {path: '', component: Home},
  {path: 'timesheet', component: Timesheet},
  {path: 'about', component: About},
  {
    path: 'github', component: RepoBrowser, children: [
    {
      path: ':org', component: RepoList, children: [
      {path: ':repo', component: RepoDetail},
      {path: '', component: RepoDetail}
    ]
    },
    {path: '', component: RepoList}
  ]
  },
  {path: 'tictactoe', component: TicTacToe},
  {path: 'ng2admin', redirectTo: '/pages/dashboard'},





];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
