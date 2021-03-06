import { Component, ElementRef, Renderer, OnInit, Input } from '@angular/core'

import { UserInterface } from '../../../services/user'

@Component({
  selector: 'zp-avatar',
  styleUrls: ['./avatar.component.scss'],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Input() user: UserInterface
  @Input() size: number
  @Input() presence: boolean = false

  constructor(public elementRef: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    if (!this.size) {
      this.size = 120
    }
    this.elementRef.nativeElement.style.maxWidth = `${this.size}px`
  }
}
