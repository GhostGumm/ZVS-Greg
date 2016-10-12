import { Component, HostBinding, AfterViewInit, OnChanges, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Animations } from '../../utils/utils.animation'

@Component({
  selector: 'zp-sidenav',
  templateUrl: './sidenav.component.html',
  providers: [],
  host: {},
  animations: []
})

export class SidenavComponent {
  @Input() sidenav:any

  constructor(){

  }  
  
  ngOnInit() {
    console.debug('SidenavComponent::ngOnInit', { sidenav:this.sidenav })
  }
}
