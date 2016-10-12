import { Component, OnInit, Input, HostBinding } from '@angular/core'

@Component({
  selector: 'zp-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @Input() user: any

  constructor() {

  }

  @HostBinding('class.flex-centered')

  ngOnInit() {
    console.debug('ProfileComponent::ngOnInit', { user:this.user })
  }
}
