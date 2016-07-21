
import {RouterConfig} from "@angular/router";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroesComponent} from "./heroes.component";
/**
 * Created by michael.liu on 7/20/2016.
 */

export const HerossRoutes:RouterConfig = [

{ path: 'herohome', component: AppComponent,
  children:[
  {path: 'dashboard',  component: DashboardComponent      },
  {path: 'detail/:id', component: HeroDetailComponent    },
  {path: 'heroes',     component: HeroesComponent},
  {path: '', component: DashboardComponent}
]
},
  ]
