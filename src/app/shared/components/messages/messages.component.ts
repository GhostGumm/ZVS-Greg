import {
  Component, HostBinding, HostListener, Input, ChangeDetectorRef,
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

export class MessagesComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() conversation: ConversationViewInterface
  private subscriptions: Array<Subscription> = []

  public messageModel: any = {
    raw: null
  }
  public limits: any = {
    message: 1000,
    upload: 20 * 1024 // 20mb
  }
  public dropZoneActive: boolean = false
  public uploader: FileUploader = new FileUploader({
    // maxFileSize:this.limits.upload,
    removeAfterUpload: true
  })

  @ViewChild('uploadInput') uploadInputRef: ElementRef // uploader dom ref

  constructor(
    private zpClient : ZetaPushClient,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private conversationService: ConversationService,
    private changeRef: ChangeDetectorRef
  ) {}

  @HostBinding('@routeAnimation') get routeAnimation() { return true }

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

  /**
   * Mouse over message listener
   */
  onMouseEnterMessage(event:MouseEvent, message, index) {
    message.isHovered = true
  }
  onMouseLeaveMessage(event:MouseEvent, message, index) {
    message.isHovered = false
  }

  ngOnChanges(changes) {
    if (changes.conversation.currentValue) {
      const onAddConversationMessage = this.conversationService.onAddConversationMessage(changes.conversation.currentValue.id)
      this.subscriptions.forEach((subscription) => subscription.unsubscribe())
      this.subscriptions.push(onAddConversationMessage.subscribe(({ result }) => {
        const { message } = result
        this.onAddMessage(message)
        this.changeRef.detectChanges()
      }))
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

  // File drop by user
  onDropAttachment(event) {
    if (event === false) {
      const { queue } = this.uploader
      this.dropZoneActive = event
      this.addFiles(queue)
    }
  }
  // File select by user
  addFiles(queue) {
    const uploader = this.uploader
    const { owner, id } = this.conversation
    console.debug('MessagesComponent::addFiles', { queue, uploader:this.uploader })
    if (queue.length > 0) {
      for (let attachment of queue) {
        this.conversationService.addConversationAttachment({ id, owner, attachment }).then((result) => {
          console.debug('onAddConversationAttachment', result)
          //this.processFile(file)
        })
      }
      uploader.clearQueue()
    }
  }
  // On file uploaded
  onAddFiles(message) {
    console.debug('MessagesComponent::onAddFiles', { message })
    this.processFile(message)
  }
  // Process received file
  processFile(message:any) {
    const { messages, users } = this.conversation
    const uploader = this.uploader
    let fileProcessed: MessageInterface = this.messageService.processAttachment({ message, users })

    messages.push(fileProcessed)
    this.messageService.indexByAuthor(messages, fileProcessed)

    console.log('MessagesComponent::processFile', {
      queue: uploader.queue,
      message,
      fileProcessed
    })
  }

  // User add message
  addMessage() {
    const { owner, id } = this.conversation
    const value = this.messageModel.raw
    console.debug('MessagesComponent::addMessage', { id, owner, value })
    this.conversationService.addConversationMarkup(id, owner, value).then((message) => {
      this.resetForm()
    })
  }
  // On user add message
  onAddMessage(message) {
    console.debug('MessagesComponent::onAddMessage', { message })
    this.processMessage(message)
  }
  // Process received message
  processMessage(message: MessageInterface) {
    const { messages, users } = this.conversation
    const uploader = this.uploader
    let messageProcessed: MessageInterface = this.messageService.processMessage({ message, users })

    messages.push(messageProcessed)
    this.messageService.indexByAuthor(messages, messageProcessed)

    console.debug('MessagesComponent::processMessage', {
      message,
      messageProcessed
    })
  }
  // Reset message form
  resetForm() {
    this.messageModel.raw = null
  }

  ngOnDestroy() {
    console.debug('MessagesComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
