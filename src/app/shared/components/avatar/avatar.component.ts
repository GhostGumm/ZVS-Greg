import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'zp-avatar',
  styles: [`
    :host {
      display: block;
      width: 50%;
    }
    img {
      width: 100%;
    }
  `],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Input() avatar: string

  constructor() { }

  ngOnInit() {
  }
}
