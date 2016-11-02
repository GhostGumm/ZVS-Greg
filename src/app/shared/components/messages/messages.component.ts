import { Component, HostBinding, HostListener, Input, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Animations } from '../../../utils/utils.animation'

import { ScrollGlueDirective } from '../../../utils/utils.scroll'
import { FileUploader, FileDropDirective, FileSelectDirective } from 'ng2-file-upload'
import { MessageService } from './message.service'

import { MessageInterface, MessageClass } from './message.interface'

const PROVIDERS = [ ScrollGlueDirective, MessageService, FileDropDirective, FileSelectDirective]

@Component({
  selector: 'zp-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [ ...PROVIDERS ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView()),
    trigger('dropZoneAnimation', Animations.fadeIn({ duration:'250ms' })),
    trigger('timestampAnimation', Animations.fadeIn({ duration:'250ms' }))
  ]
})

export class MessagesComponent implements OnInit, AfterViewInit, OnDestroy {
  indexMessageTest = 0
  messages: MessageInterface[] = Array.from(new Array(20), () => {
    this.indexMessageTest++
    return new MessageClass({
      id:`${this.indexMessageTest}`,
      author:'toto',
      metadata:{},
      isHovered:false,
      type:'text',
      value:'http://google.fr regarde ça raphael @toto',
      raw:'http://google.fr regarde ça raphael @toto',
      date:Date.now()
    })
  })
  messageModel: any = {
    raw:null
  }
  limits: any = {
    message: 1000,
    upload: 20 * 1024 // 20mb
  }
  subscriptions: Array<Subscription> = []
  dropZoneActive:boolean = false
  uploader: FileUploader = new FileUploader({
    // maxFileSize:this.limits.upload,
    removeAfterUpload: true
  })

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {
    messageService.indexByAuthor(this.messages)
  }

  /**
   * Drag & Drop listener
   */
  @HostListener('document:dragenter', ['$event'])
  onDragEnter(event:MouseEvent) {
    console.debug('MessagesComponent::onDragEnter',{ event })
    this.dropZoneActive = true
  }
  onDropzoneLeave(event:MouseEvent) {
    console.debug('MessagesComponent::onDropzoneLeave',{ event })
    this.dropZoneActive = false
  }

  onMouseEnterMessage(event:MouseEvent, message, index) {
    message.isHovered = true
  }
  onMouseLeaveMessage(event:MouseEvent, message, index) {
    message.isHovered = false
  }

  ngOnInit() {
    console.debug('MessagesComponent::ngOnInit', {
      messages: this.messages
    })
  }
  
  // Custom Track By
  trackByMessageId(index: number, message: MessageInterface) {
    return message.id
  }

  // uploader dom ref
  @ViewChild('uploadInput') uploadInputRef: ElementRef
  ngAfterViewInit() {
  this.uploader.onAfterAddingFile = (item => {
    this.uploadInputRef.nativeElement.value = ''
    });
  }

  // Click on md-list-item
  onClickMessage(event:MouseEvent, message, index) {
    console.debug('MessagesComponent::onClickMessage', { message, event, index })
    const { type } = message
    switch(type) {
    // case 'text':
    //   this.onImageClicked()
    //   break
    // case 'attachment':
    //   this.onImageClicked()
    //   break
    case 'image':
      this.onImageClicked()
      break
    }
  }
  onImageClicked() {
    
  }
  /**
   * Select files with input
   */
  onSelectAttachment(event) {
    let target = event.target || event.srcElement
    this.uploader.addToQueue(target.files);
    const { uploader, uploader:{ queue } } = this
    console.warn('MessagesComponent::onSelectAttachment', { event, uploader:this.uploader })
    // this.uploader.setOptions({
    //   url: 'https://evening-anchorage-3159.herokuapp.com/api/'
    // })
    // this.uploader.uploadAll()
    // this.uploader.clearQueue()
    
    this.addFiles(queue)
  }
  /**
   * Select files with drag & drop
   */
  onDropAttachment(event) {
    if (event === false) {
      const { queue } = this.uploader
      this.dropZoneActive = event
      this.addFiles(queue)
    }
  }
  addFiles(queue) {
    console.debug('MessagesComponent::addFiles', { queue:queue.length, uploader:this.uploader })
    if (queue.length > 0) {
      for (let file of queue) {
        this.processInput({ type:'attachment', file })
      }
    }
  }
  /** 
   * Process input by type
   */
  processInput({ type = 'text', file = null } = {}) {
    const { raw } = this.messageModel
    const uploader = this.uploader

    const message = new MessageClass({
      id:`${this.messages.length}`,
      type:type,
      author: 'Raphaël',
      date: Date.now(),
      raw,
      owner: true,
      isHovered:false,
      metadata:{}
    })

    console.log('MessagesComponent::processInput', {
      type,
      file,
      message
    })

    switch(type){
    case 'text':
      this.messageService.processMessage(message)
      this.resetForm()
      break
    case 'attachment':
      this.messageService.processAttachment({
        message,
        file
      })
      break
    }
    this.messages.push(message)
    this.messageService.indexByAuthor(this.messages, message)
    
    if (uploader.queue.length == 0) {
      uploader.clearQueue()
    }
  }

  resetForm() {
    this.messageModel.raw = null
  }
  
  ngOnDestroy() {
    console.debug('MessagesComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
