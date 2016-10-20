import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload';

import { ScrollGlueDirective } from '../../../utils/utils.scroll'
import { MessageInterface, MessageClass, MessageOrder } from './message.interface'

const message:MessageInterface = {
    id:'',
    author:'Raphaël',
    metadata:{},
    type:'',
    value:'',
    raw:'',
    date:null
}

const messageTest:MessageInterface = {
  id:'1',
  author:'toto',
  metadata:{},
  type:'text',
  value:'http://google.fr regarde ça raphael @toto',
  raw:'http://google.fr regarde ça raphael @toto',
  date:Date.now()
}

@Component({
  selector: 'zp-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [ ScrollGlueDirective ]
})

export class MessagesComponent implements OnInit {
  //public uploader:FileUploader = new FileUploader({url: ''});
  messages: MessageInterface[] = Array.from(new Array(20), () => new MessageClass(messageTest))
  message: MessageInterface = message
  files: any
  limits: any = {
    message:1000,
    upload: 20 * 1024 // 20mb
  }

  constructor() {
    MessageOrder(this.messages)
  }

  ngOnInit() {
    console.debug('MessagesComponent::ngOnInit', {
      messages: this.messages
    })
  }

  onSend({ type = 'text' } = {}) {
    this.processMessage()
    this.resetForm()
  }

  onSelectAttachment($event) {
    console.log('', {
      $event,
      files: this.files
    })
  }

  processMessage() {
    const message = new MessageClass(this.message)

    // Mock Purpose
    message.value = message.raw
    message.date = Date.now()
    message.owner = true
    //
    this.messages.push(message)
    MessageOrder(this.messages, message)
    console.debug('MessagesComponent::processMessage', { message })
  }

  resetForm() {
    this.message.raw = null
  }
}
