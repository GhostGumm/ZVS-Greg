import { Component, OnInit, Input, HostBinding } from '@angular/core'
import { UserInterface } from '../../../services/'

@Component({
  selector: 'zp-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @Input() user: UserInterface

  constructor() {
  }

  @HostBinding('class.flex-centered')

  ngOnInit() {
    console.debug('ProfileComponent::ngOnInit', {
      user: this.user
    })
  }
}
