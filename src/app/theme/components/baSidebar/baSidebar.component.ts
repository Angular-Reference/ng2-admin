import {Component, ElementRef, HostListener, ViewEncapsulation} from '@angular/core';
import {AppState} from '../../../app.state';
import {layoutSizes} from '../../../theme';
import {BaMenu} from '../baMenu';
import {routes} from '../../../../app/app.routes';

//add the povide plug in the webpack.common for lodash, so don't need to import it now
// import lodash = require('lodash');

@Component({
  selector: 'ba-sidebar',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baSidebar.scss')],
  template: require('./baSidebar.html'),
  providers: [],
  directives: [BaMenu]
})
export class BaSidebar {

  // here we declare which routes we want to use as a menu in our sidebar

  //deep clone the route menu because the bamenu will change the original menu data, so when leave the ng2-admin page and
  //return , the left menu will not show correctly.
  public routes = lodash.cloneDeep(routes);

  public menuHeight:number;
  public isMenuCollapsed:boolean = false;
  public isMenuShouldCollapsed:boolean = false;


  constructor(private _elementRef:ElementRef, private _state:AppState) {

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngOnInit():void {
    if (this._shouldMenuCollapse()) {
      this.menuCollapse();
    }
    console.log("barSidebar init: ",this.routes);
    console.log("barSidebar init: ", this.routes.toString());
  }

  public ngAfterViewInit():void {
    setTimeout(() => this.updateSidebarHeight());
  }

  @HostListener('window:resize')
  public onWindowResize():void {

    var isMenuShouldCollapsed = this._shouldMenuCollapse();

    if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
      this.menuCollapseStateChange(isMenuShouldCollapsed);
    }
    this.isMenuShouldCollapsed = isMenuShouldCollapsed;
    this.updateSidebarHeight();
  }

  public menuExpand():void {
    this.menuCollapseStateChange(false);
  }

  public menuCollapse():void {
    this.menuCollapseStateChange(true);
  }

  public menuCollapseStateChange(isCollapsed:boolean):void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public updateSidebarHeight():void {
    // TODO: get rid of magic 84 constant
    this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84;
  }

  private _shouldMenuCollapse():boolean {
    return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
  }
}
