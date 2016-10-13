import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'zp-avatar',
  styleUrls: ['./avatar.component.scss'],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Input() avatar: string

  constructor() { }

  ngOnInit() {
  }
}
