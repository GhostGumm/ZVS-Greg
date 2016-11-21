import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core'
import { UserInterface } from '../../../services/user'

@Component({
  selector: 'zp-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @Input() user: UserInterface
  @Output() logout = new EventEmitter()

  @HostBinding('class.flex-centered')

  ngOnInit() {
    console.debug('ProfileComponent::ngOnInit', {
      user: this.user
    })
  }
  onLogoutClick() {
    this.logout.emit()
  }
}
