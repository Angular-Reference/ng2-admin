import {provideRouter, RouterConfig} from '@angular/router';
import {LoginRoutes} from "./pages/login/login.routes";
import {PagesRoutes} from "./pages/pages.routes";
import {RegisterRoutes} from "./pages/register/register.routes";




import {App} from "./app";
import {AppNg2Admin} from "./app.component";
import {ComponentsRoutes} from "./components/component.routes";



export const routes:RouterConfig = [
  ...LoginRoutes,
  ...RegisterRoutes,
  ...PagesRoutes,

  ...ComponentsRoutes,
  // {
  //   path: '**',
  //   redirectTo: '/pages/dashboard'
  // },

  {path: 'ng2admin', redirectTo: '/pages/dashboard'},





];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
