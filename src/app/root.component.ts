import { Component, AfterViewInit, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'zp-root',
  template: '<router-outlet></router-outlet>'
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


