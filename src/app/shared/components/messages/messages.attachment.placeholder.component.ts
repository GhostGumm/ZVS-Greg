import {
  Component, Input, OnInit
} from '@angular/core'

import { MessageInterface } from './../../../services'

@Component({
  selector: 'zp-attachement-placeholder',
  templateUrl: './messages.attachment.placeholder.component.html',
  styleUrls: ['./messages.attachment.placeholder.component.scss'],
})

export class AttachmentPlaceholderComponent implements OnInit {

  @Input() message: MessageInterface
  @Input() background: boolean = false
  @Input() warning: boolean = false

  constructor() {
  }

  ngOnInit() {
  }
}
