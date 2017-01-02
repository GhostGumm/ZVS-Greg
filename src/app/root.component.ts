import { Component, AfterViewInit, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'zp-root',
  styles: [`
    :host,
    .Layout {
      display: flex;
      height: 100%;
      width: 100%;
    }
  `],
  template: '<section class="Layout" zp-connection-status><router-outlet></router-outlet></section>'
})
export class RootComponent implements AfterViewInit, OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    console.debug('AppComponent::ngOnInit')
  }
  ngAfterViewInit() {
    console.debug('AppComponent::ngAfterViewInit')
    /* UI boot struck prevent loader fadeOut :(
      let loader = <HTMLElement>document.querySelector('zp-loader')
      loader.style.visibility='hidden'
      setTimeout(() => loader.remove, 500)
    */
  }
}


