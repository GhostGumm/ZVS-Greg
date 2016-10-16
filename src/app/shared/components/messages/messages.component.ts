import { Component, OnInit } from '@angular/core'
import { Message } from './message.interface'
import { MESSAGES } from './messages.mock'

@Component({
  selector: 'zp-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {
  messages: Message[] = MESSAGES

  constructor() {}

  ngOnInit() {
    console.debug('MessagesComponent::ngOnInit', {
      messages: this.messages
    })
  }
}
