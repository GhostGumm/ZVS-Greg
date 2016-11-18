import {
  Component, HostBinding, HostListener, Input,
  ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges, OnDestroy, trigger
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Animations } from '../../../utils/utils.animation'
import { ZetaPushClient } from '../../../zetapush'

import { ScrollGlueDirective } from '../../../utils/utils.scroll'
import { FileUploader, FileDropDirective, FileSelectDirective } from 'ng2-file-upload'
import {
  ConversationService, ConversationViewInterface,
  UserInterface,
  MessageService, MessageInterface, MessageClass
} from './../../../services';

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

export class MessagesComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() conversation: ConversationViewInterface
  private subscriptions: Array<Subscription> = []

  public messageModel: any = {
    raw: null
  }
  public limits: any = {
    message: 1000,
    upload: 20 * 1024 // 20mb
  }
  public dropZoneActive:boolean = false
  public uploader: FileUploader = new FileUploader({
    // maxFileSize:this.limits.upload,
    removeAfterUpload: true
  })

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  @HostListener('document:dragenter', ['$event'])

  // uploader dom ref
  @ViewChild('uploadInput') uploadInputRef: ElementRef

  constructor(
    private zpClient : ZetaPushClient,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private conversationService: ConversationService,
  ) {
    this.addApiObservable()
  }

  addApiObservable() {
    this.subscriptions.push(this.conversationService.onAddConversationMarkup.subscribe((result) => {
      this.onAddMessage(result)
    }))
    this.subscriptions.push(this.conversationService.onAddConversationAttachment.subscribe((result) => {
      this.onAddFiles(result)
    }))
  }

  /**
   * Drag & Drop listener
   */
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
      conversation: this.conversation
    })
  }
  ngOnChanges(changes) {
    console.debug('MessagesComponent::ngOnChanges', {
      conversation: this.conversation,
      changes
    })
    // Mock Purpose
    if (changes.conversation.currentValue) {
      this.messageService.indexByAuthor(this.conversation.messages)
    }
  }

  // Custom Track By
  trackByMessageId(index: number, message: MessageInterface) {
    return message.id
  }

  ngAfterViewInit() {
    // Clear input on adding file
    this.uploader.onAfterAddingFile = (item => {
      this.uploadInputRef.nativeElement.value = ''
    })
  }

  // Click on md-list-item
  onClickMessage(event: MouseEvent, message, index) {
    console.debug('MessagesComponent::onClickMessage', { message, event, index })
    const { type } = message
    switch (type) {
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
    console.debug('MessagesComponent::addFiles', { queue, uploader:this.uploader })
    if (queue.length > 0) {
      for (let file of queue) {
        this.processInput({ file })
      }
    }
  }
  onAddFiles(result) {
    console.debug('MessagesComponent::onAddFiles', { result })
  }

  addMessage() {
    const { owner, id } = this.conversation
    const value = this.messageModel.raw
    console.debug('MessagesComponent::addMessage', { id, owner, value })
    this.conversationService.addConversationMarkup(id, owner, value).then((message) => {
      console.debug('MessagesComponent::addMessage:success', { message })
      this.processInput({ message })
      this.resetForm()
    })
  }
  onAddMessage(result) {
    console.debug('MessagesComponent::onAddMessage', { result })
  }

  /**
   * Process input by type
   */
  processInput({ file = null, message } : { file?: any, message?: MessageInterface}) {
    const { messages, users } = this.conversation
    const uploader = this.uploader
    let messageProcessed: MessageInterface = this.messageService.processMessage({ message, users })

    messages.push(messageProcessed)
    this.messageService.indexByAuthor(messages, messageProcessed)

    if (uploader.queue.length === 0) {
      uploader.clearQueue()
    }

    console.log('MessagesComponent::processInput', {
      file,
      message,
      messageProcessed
    })
  }

  resetForm() {
    this.messageModel.raw = null
  } 

  ngOnDestroy() {
    console.debug('MessagesComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
