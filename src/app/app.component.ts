import { Component, ViewContainerRef, AfterViewInit } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent implements AfterViewInit{
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


