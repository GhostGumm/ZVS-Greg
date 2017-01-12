import { Component, OnInit, Input } from '@angular/core'
import { UserInterface } from '../../../services/user'

@Component({
  selector: 'zp-username',
  styleUrls: ['./username.component.scss'],
  templateUrl: './username.component.html'
})
export class UsernameComponent implements OnInit {
  @Input() user: UserInterface
  @Input() presence: boolean = true
  @Input() lastname: boolean = true

  constructor() { }

  ngOnInit() {
  }

}
