import { Component, OnInit, Input, HostBinding } from '@angular/core'

@Component({
  selector: 'zp-profile',
  styles: [`
    :host {
      height: 200px;
      display: flex;
      flex-direction: column;
    }
  `],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @Input() user: any

  constructor() {

  }

  @HostBinding('class.flex-centered')

  ngOnInit() {
    console.debug('ProfileComponent::ngOnInit', {
      user: this.user
    })
  }
}
