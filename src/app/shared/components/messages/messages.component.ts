import {
  Component, HostBinding, HostListener, Input, ChangeDetectorRef,
  ViewChild, ElementRef, AfterViewInit, OnChanges, OnDestroy, trigger
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { MdDialog, MdDialogRef } from '@angular/material'
import { Subscription } from 'rxjs/Subscription'
import { Animations } from '../../../utils/utils.animation'
import { ZetaPushClient } from '../../../zetapush'

import { ScrollGlueDirective } from '../../../utils/utils.scroll'
import { FileUploader, FileDropDirective, FileSelectDirective } from 'ng2-file-upload'
import {
  ConversationService, ConversationViewInterface,
  MessageService, MessageInterface, MessageClass
} from './../../../services'
import { GalleryComponent } from '../gallery/gallery.component'

const PROVIDERS = [ ScrollGlueDirective, MessageService, FileDropDirective, FileSelectDirective]


@Component({
  selector: 'zp-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [ ...PROVIDERS ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView),
    trigger('dropZoneAnimation', Animations.fadeIn),
    trigger('timestampAnimation', Animations.fadeIn)
  ]
})

export class MessagesComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() conversation: ConversationViewInterface
  @Input() loading: boolean
  private gallery: MdDialogRef<GalleryComponent>
  private subscriptions: Array<Subscription> = []

  private messageRaw: string
  public limits: any = {
    message: 4000,
    upload: 20 * 1024 // 20mb
  }
  dropZoneActive: boolean = false
  private uploader: FileUploader = new FileUploader({
    // maxFileSize:this.limits.upload,
    removeAfterUpload: true
  })

  @ViewChild('uploadInput') uploadInputRef: ElementRef // uploader dom ref
  @ViewChild('messageForm')  messageForm: NgForm // form message dom ref

  constructor(
    private zpClient: ZetaPushClient,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private conversationService: ConversationService,
    private changeRef: ChangeDetectorRef,
    public dialog: MdDialog
  ) {
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
    console.log('MessagesComponent::ngOnChanges', { changes })
    if (changes.conversation && changes.conversation.currentValue) {
      this.onGetConversation(changes)
    }
  }

  onGetConversation(changes) {
    // Reset subscriptions
    const onAddConversationMessage = this.conversationService.onAddConversationMessage(changes.conversation.currentValue.id)
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.subscriptions.push(onAddConversationMessage.subscribe(({ result }) => {
      const { message } = result
      this.onAddMessage(message)
      this.changeRef.detectChanges()
    }))

    this.resetForm()
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

  // User add message
  addMessage($event) {
    $event.preventDefault()
    const { owner, id } = this.conversation
    const value = this.messageRaw
    console.debug('MessagesComponent::addMessage', { id, owner, value, $event })
    if (value.trim().length > 0) {
      this.conversationService.addConversationMarkup(id, owner, value).then((message) => {
        this.resetForm()
      })
    }
  }
  // On user add message
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

  // Process received attachment
  processAttachment(message: any) {
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

  // Process received message
  processMarkup(message: MessageInterface) {
    const { messages, users } = this.conversation

    let messageProcessed: MessageInterface = this.messageService.processMarkup({ message, users })

    messages.push(messageProcessed)
    this.messageService.indexByAuthor(messages, messageProcessed)

    console.debug('MessagesComponent::processMessage', {
      message,
      messageProcessed
    })
  }

  // Reset message form
  resetForm() {
    this.messageRaw = ''
  }

  openGallery(message: MessageInterface) {
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
    this.changeRef.detach()
  }
}
