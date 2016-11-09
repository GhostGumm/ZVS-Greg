import { Component, ElementRef, Renderer, OnInit, Input } from '@angular/core'
import { UserInterface } from '../../../services/'

@Component({
  selector: 'zp-avatar',
  styleUrls: ['./avatar.component.scss'],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Input() user: UserInterface
  @Input() size: number
  @Input() presence: boolean = false
  avatar: string

  constructor(public elementRef: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    if (!this.user) {
      this.avatar = './assets/zetalk_logo.png'
    }
    else {
      this.avatar = this.user.avatar
    }
    if (!this.size) {
      this.size = 120
    }
    this.elementRef.nativeElement.style.maxWidth = `${this.size}px`
  }
}
