import {
  Component, HostBinding, HostListener, Input, NgZone,
  ViewChild, ElementRef, OnInit, AfterViewInit, OnChanges, OnDestroy, trigger
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { MdDialog, MdDialogRef } from '@angular/material'
import { Subscription } from 'rxjs/Subscription'
import { fadeIn, fadeInHeight, swipeOutDownView } from '../../../utils/utils.animation'
import { ZetaPushClient } from '../../../zetapush'

import { ScrollGlueDirective } from '../../../utils/utils.scroll'
import { FileUploader, FileDropDirective, FileSelectDirective } from 'ng2-file-upload'
import {
  ConversationService, ConversationViewInterface,
  MessageService, MessageInterface, MessageClass
} from './../../../services'
import { GalleryComponent } from '../gallery/gallery.component'

const PROVIDERS = [ ScrollGlueDirective, FileDropDirective, FileSelectDirective]


@Component({
  selector: 'zp-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [ ...PROVIDERS ],
  animations: [
    trigger('routeAnimation', swipeOutDownView),
    trigger('fadeInAnimation', fadeIn),
    trigger('fadeInHeightAnimation', fadeInHeight)
  ]
})

export class MessagesComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() conversation: ConversationViewInterface
  @Input() loading: boolean

  private gallery: MdDialogRef<GalleryComponent>
  private subscriptions: Array<Subscription> = []

  private messageRaw: string
  public limits: any = {
    message: 4000,
    upload: 20 * 1024 // 20mb
  }
  private progress: number
  private dropZoneActive: boolean = false
  private uploader: FileUploader = new FileUploader({
    // maxFileSize:this.limits.upload,
    removeAfterUpload: true
  })
  private incomingMessage: any = {
    user: {},
    active: false
  }

  @ViewChild(ScrollGlueDirective) messageListRef: ScrollGlueDirective // message container directive ref
  @ViewChild('uploadInput') uploadInputRef: ElementRef // uploader dom ref
  @ViewChild('messageForm') messageForm: NgForm // form message dom ref

  constructor(
    private zpClient: ZetaPushClient,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private conversationService: ConversationService,
    public dialog: MdDialog,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.conversationService.percent.subscribe({
      next: (progress) => { this.zone.run(() => {
        this.progress = progress
        console.debug('MessagesComponent::upload.progress', { progress: this.progress })
      })}
    })
    this.messageListRef.isTop.subscribe({
      next: () => {
        this.getNextMessage()
      }
    })
  }

  ngAfterViewInit() {
    // Clear input on adding file
    this.uploader.onAfterAddingFile = (item => {
      this.uploadInputRef.nativeElement.value = ''
    })
  }

  @HostBinding('@routeAnimation') get routeAnimation() { return true }

  /**
   * Drag & Drop listener
   */
  @HostListener('document:dragenter', ['$event'])
  onDragStart(event: MouseEvent) {
    console.debug('MessagesComponent::onDragStart', { event })
    this.dropZoneActive = true
  }
  // @HostListener('document:dragleave', ['$event'])
  // onDragEnd(event: MouseEvent) {
  //   console.debug('MessagesComponent::onDragEnd', { event })
  //   this.dropZoneActive = false
  // }
  onDropzoneLeave(event: MouseEvent) {
    console.debug('MessagesComponent::onDropzoneLeave', { event })
    this.dropZoneActive = false
  }

  /**
   * Mouse over message listener
   */
  onMouseEnterMessage(event: MouseEvent, message, index) {
    message.isHovered = true
  }
  onMouseLeaveMessage(event: MouseEvent, message, index) {
    message.isHovered = false
  }

  ngOnChanges(changes) {
    console.debug('MessagesComponent::ngOnChanges', { changes })
    if (changes.conversation && changes.conversation.currentValue) {
      const id = changes.conversation.currentValue.id
      this.onGetConversation(id)
    }
  }

  onGetConversation(id) {
    // Reset subscriptions
    const onAddConversationMessage = this.conversationService.onAddConversationMessage(id)
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions.push(onAddConversationMessage.subscribe(({ result }) => {
      const { message } = result
      this.onAddMessage(message)
    }))

    this.resetForm()
  }

  // Custom Track By
  trackByMessageId(index: number, message: MessageInterface) {
    return message.id
  }

  getNextMessage() {
    // No fetch if no next messages available
    if (this.conversation.pagination.hasNext === false) {
      return
    }
    this.messageListRef.isLocked = false
    this.conversationService.getConversationMessages(this.conversation).then((result) => {
      console.debug('MessagesComponent::getNextMessage', { result })
      // Zero timeout scroll incase of no scrollbar on first fetch 
      setTimeout(() => {
        if (this.conversation.pagination.hasNext === true) {
          this.messageListRef.el.scrollTop = 80
        }
      }, 0)
      // 1000ms if user re-scroll fast
      setTimeout(() => {
        this.messageListRef.isLocked = true
      }, 1000)
    })
  }

  // Click on md-list-item
  onClickMessage(event: MouseEvent, message: MessageInterface, index) {
    console.debug('MessagesComponent::onClickMessage', { message, event, index })
    const { type } = message
    switch (type) {
    case 'attachment':
      this.openGallery(message)
      break
    }
  }

  inputFileClick() {
    this.uploadInputRef.nativeElement.click()
  }
  /**
   * Select files with input
   */
  onSelectAttachment(event) {
    let target = event.target || event.srcElement
    this.uploader.addToQueue(target.files)
    const { uploader, uploader: { queue } } = this
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
    console.debug('MessagesComponent::addFiles', { queue, uploader })
    if (queue.length > 0) {
      for (let attachment of queue) {
        this.conversationService.addConversationAttachment({ id, owner, attachment }).then((result) => {
          console.debug('onAddConversationAttachment', result)
        })
      }
      uploader.clearQueue()
    }
  }

  // user send a message
  addMessage(event) {
    event.preventDefault()
    const { owner, id } = this.conversation
    const value = this.messageRaw
    console.debug('MessagesComponent::addMessage', { id, owner, value, event })
    if (value.trim().length > 0) {
      this.conversationService.addConversationMarkup(id, owner, value).then((message) => {
        this.resetForm()
      })
    }
  }
  // users receive a message
  onAddMessage(message) {
    console.debug('MessagesComponent::onAddMessage', { message })
    const { data } = message
    switch (data.type) {
      case MessageClass.TYPE_ATTACHMENT:
        this.processAttachment(message)
      break
      case MessageClass.TYPE_MARKUP:
        this.processMarkup(message)
      break
    }
  }
  // user is writing message
  onIncomingMessage(message: MessageInterface) {
    console.debug('MessagesComponent::onIncomingMessage')
    this.incomingMessage.active = true
    this.incomingMessage.user = message.user
  }
  // user cancel message he was writing
  onCanceledMessage() {
    this.incomingMessage.active = false
    this.incomingMessage.user = {}
  }

  // Process received attachment
  processAttachment(message: any) {
    const { users } = this.conversation
    const uploader = this.uploader
    let fileProcessed: MessageInterface = this.messageService.processAttachment({ message, users, isNew: true })

    this.pushProcessedMessage(fileProcessed)

    console.debug('MessagesComponent::processFile', {
      queue: uploader.queue,
      message,
      fileProcessed
    })
  }

  // Process received message
  processMarkup(message: MessageInterface) {
    const { users } = this.conversation

    let messageProcessed: MessageInterface = this.messageService.processMarkup({ message, users, isNew: true })

    this.pushProcessedMessage(messageProcessed)

    console.debug('MessagesComponent::processMessage', {
      message,
      messageProcessed
    })
  }

  pushProcessedMessage(message: MessageInterface) {
    const { messages } = this.conversation
    messages.push(message)
    this.messageService.indexByAuthor(messages, message)
  }

  // Reset message form
  resetForm() {
    this.messageRaw = ''
  }

  openGallery(message: MessageInterface) {
    console.debug('MessagesComponent::Gallery:open', { message })
    this.gallery = this.dialog.open(GalleryComponent)
    this.gallery.componentInstance.files = this.messageService.getFiles()
    this.gallery.componentInstance.selected = message
    this.gallery.afterClosed().subscribe(result => {
      console.debug('MessagesComponent::Gallery:afterClosed', { result })
      this.gallery = null
    })
  }

  ngOnDestroy() {
    console.debug('MessagesComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.conversationService.cancelupload()
  }
}
