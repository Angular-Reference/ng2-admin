import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'as-navbar',
    // templateUrl: './navbar.html',
  // styles: [require('./_nav.scss.scss'),require('./_navbar.scss')],
  template: require('./navbar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
export class NavbarComponent {
    @Input() brand: string;
}
