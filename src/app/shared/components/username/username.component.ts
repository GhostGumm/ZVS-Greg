import { Component, OnInit, Input } from '@angular/core'
import { UserInterface } from '../../../services/'

@Component({
  selector: 'zp-username',
  styleUrls: ['./username.component.scss'],
  templateUrl: './username.component.html'
})
export class UsernameComponent implements OnInit {
  @Input() user: UserInterface

  constructor() { }

  ngOnInit() {
  }

}
