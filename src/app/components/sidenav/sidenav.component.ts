import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'zp-sidenav',
  templateUrl: './sidenav.component.html',
  providers: [],
  animations: []
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
