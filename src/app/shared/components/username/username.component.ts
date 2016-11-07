import { Component, OnInit, Input } from '@angular/core'
import { User } from '../../../services/'

@Component({
  selector: 'zp-username',
  styleUrls: ['./username.component.scss'],
  templateUrl: './username.component.html'
})
export class UsernameComponent implements OnInit {
  @Input() user: User

  constructor() { }

  ngOnInit() {
  }

}
