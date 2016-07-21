import {Component, ViewEncapsulation} from '@angular/core';
import {BaPageTop, BaContentTop, BaSidebar, BaBackTop} from '../theme/components';
import {NavbarComponent} from "../shared/navbar/navbar.component";

@Component({
  selector: 'container',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <div class="al-main">
      <div class="al-content">
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

    `
})
export class Commons {

  constructor() {
  }

  ngOnInit() {
  }
}
