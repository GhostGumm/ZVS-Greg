import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'zp-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @Input() user:any

  constructor() {

  }

  ngOnInit() {
  }
}
