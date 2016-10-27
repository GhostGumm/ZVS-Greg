import { Component, HostBinding, HostListener, Renderer, ViewEncapsulation, OnInit, OnDestroy, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Animations } from '../../../utils/utils.animation'

import { ScrollGlueDirective } from '../../../utils/utils.scroll'
import { FileUploader, FileDropDirective, FileSelectDirective } from 'ng2-file-upload'
import { MessageService } from './message.service'
const PROVIDERS = [ ScrollGlueDirective, MessageService, FileDropDirective, FileSelectDirective ]

import { MessageInterface, MessageClass } from './message.interface'

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
  providers: [ ...PROVIDERS ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView()),
    trigger('dropZoneAnimation', Animations.fadeIn({ duration:'250ms' }))
  ]
})

export class MessagesComponent implements OnInit, OnDestroy {
  messages: MessageInterface[] = Array.from(new Array(20), () => new MessageClass(messageTest))
  message: MessageInterface = message
  limits: any = {
    message: 1000,
    upload: 20 * 1024 // 20mb
  }
  subscriptions: Array<Subscription> = []
  dropZoneActive:boolean = false
  uploader: FileUploader = new FileUploader({})

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private router: Router,
    private messageService: MessageService,
    private renderer: Renderer
  ) {
    messageService.indexByAuthor(this.messages)
  }

  /**
   * Drag & Drop listener
   */
  @HostListener('dragenter', ['$event'])
  onDragEnter(event) {
    console.debug('MessagesComponent::onDragEnter',{ event })
    this.dropZoneActive = true
  }
  onDropzoneLeave(event) {
    console.debug('MessagesComponent::onDropzoneLeave',{ event })
    this.dropZoneActive = false
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

  onSelectAttachment(event?) {
    console.log('MessagesComponent::onSelectAttachment', {
      event,
      uploader: this.uploader
    })
    this.uploader.setOptions({
      url: 'https://evening-anchorage-3159.herokuapp.com/api/'
    })
    this.uploader.uploadAll()
    this.uploader.clearQueue()
  }

  onDropAttachment(event) {
    console.log('MessagesComponent::onDropAttachment', {
      event,
      queue: this.uploader.queue
    })
    this.dropZoneActive = event
    if (this.uploader.queue.length > 0) {
      this.onSelectAttachment()
    }
  }
  processMessage() {
    const message = new MessageClass(this.message)

    // Mock Purpose
    message.value = message.raw
    message.date = Date.now()
    message.owner = true
    //
    this.messages.push(message)
    this.messageService.indexByAuthor(this.messages, message)
    console.debug('MessagesComponent::processMessage', { message })
  }

  resetForm() {
    this.message.raw = null
  }  
  
  ngOnDestroy() {
    console.debug('MessagesComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
