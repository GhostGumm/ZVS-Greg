import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'zp-sidenav-context',
  styleUrls: ['./sidenav.context.component.scss'],
  templateUrl: './sidenav.context.component.html'
})
export class SidenavContextComponent implements OnInit {

  contexts: any = [
    {
      name: 'toto',
      link: ['context', 1]
    }, {
      name: 'tutu',
      link: ['context', 2]
    }, {
      name: 'titi',
      link: ['context', 3]
    }, {
      name: 'tata',
      link: ['context', 4]
    }
  ]

  constructor() {}

  ngOnInit() {
    console.debug('SidenavContextComponent::ngOnInit')
  }
}
