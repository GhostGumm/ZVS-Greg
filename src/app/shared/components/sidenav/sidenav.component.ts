import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'zp-sidenav',
  styles: [`
    :host {
      display: block;
      width: 280px;
    }
  `],
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {
  @Input() sidenav: any

  constructor() {}

  ngOnInit() {
    console.debug('SidenavComponent::ngOnInit', {
      sidenav: this.sidenav
    })
  }
}
