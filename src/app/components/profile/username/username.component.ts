import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'zp-username',
  templateUrl: './username.component.html'
})
export class UsernameComponent implements OnInit {
  @Input() user: any

  constructor() { }

  ngOnInit() {
  }

}
