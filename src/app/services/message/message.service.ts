import { Inject, Injectable } from '@angular/core'

import { UserInterface } from '../user'
import { MessageInterface, MessageClass } from '../message'

import { ZetaPushClient } from '../../zetapush'
import { ENVIRONMENT } from '../../app-config.module'

@Injectable()
export class MessageService {
  public static files: Array<MessageInterface> = []
  private userKey = this.zpClient.getUserId()
  private proxy: string

  constructor(
    @Inject(ENVIRONMENT) private environment,
    private zpClient: ZetaPushClient
  ) {
    this.proxy = environment.ZETAPUSH_PROXY_URL
  }

  resetServices() {
    MessageService.files = []
  }

  getFiles() {
    console.debug('MessageService::getFiles', MessageService.files)
    return MessageService.files
  }

  setFile(file) {
    console.debug('MessageService::setFile', file)
    MessageService.files.push(file)
  }

  /**
   * Messages: List of messages to index on init
   * Message? : Message to index once added
   * Toggle class 'precede' if messages[n].author == messages[n - 1].author
   */
  indexByAuthor(messages: MessageInterface[], message?: MessageInterface) {
    if (messages.length > 1) {
      if (message) {
        const index = messages.indexOf(message)
        const previous = messages[index - 1]
        if (message.author === previous.author) {
          message.isPrecede = true
        }
      } else {
        for (let index = 1; index < messages.length; index++) {
          let msg = messages[index]
          let previous = messages[index - 1]

          if (msg.author === previous.author) {
            msg.isPrecede = true
          }
        }
      }
    }
    console.debug('MessageOrder', {
      messages,
      message
    })
  }

  processData({ message, users }: { message: any, users: Array<UserInterface> }) {
    let { author, type, value, raw, date, metadata } = message.data
    const id = message.guid

    return new MessageClass({
      id,
      author,
      type,
      value,
      raw,
      date,
      metadata,
      isOwner: author === this.userKey ? true : false,
      user: users.find(u => u.id === author)
    })
  }

  processMarkup({ message, users }: { message: any, users: Array<UserInterface> }) {
    let markup = this.processData({ message, users })
    return markup
  }

  processAttachment({ message, users }: { message: any, users: Array<UserInterface> }) {
    const attachment = this.processData({ message, users })
    const { metadata } = attachment

    // Rename value with proxy url
    attachment.value = `${this.proxy}${attachment.value}`
    this.setFile(attachment)

    // Format size value
    metadata.size = this.formatBytes(metadata.size, 1)

    // Set icon based on content-type
    const contentType = metadata ? metadata.contentType : null
    if (contentType) {
      if (contentType.match(/image/g)) {
        metadata.class = 'fa-image'
        metadata.type = 'image'
      } else {
        metadata.class = 'fa-file'
        metadata.type = 'file'
      }
      // } else if (contentType.match(/pdf/g)) {
      //   metadata.class = 'fa-file-pdf-o'
      //   metadata.type = 'pdf'
      // } else if (contentType.match(/msword/g)) {
      //   metadata.class = 'fa-file-word-o'
      //   metadata.type = 'word'
      // } else if (contentType.match(/excel/g)) {
      //   metadata.class = 'fa-file-excel-o'
      //   metadata.type = 'excel'
      // } else if (contentType.match(/zip|compressed|bzip/g)) {
      //   metadata.class = 'fa-file-zip-o'
      //   metadata.type = 'zip'
      // } else if (contentType.match(/powerpoint/g)) {
      //   metadata.class = 'fa-file-powerpoint-o'
      //   metadata.type = 'powerpoint'
      // } else if (contentType.match(/video/g)) {
      //   metadata.class = 'fa-file-video-o'
      //   metadata.type = 'video'
      // } else if (contentType.match(/byte/g)) {
      //   metadata.class = 'fa-file-code-o'
      //   metadata.type = 'code'
      // } else if (contentType.match(/audio/g)) {
      //   metadata.class = 'fa-file-audio-o'
      //   metadata.type = 'audio'
      // } else {
      //   metadata.class = 'fa-file-o'
      // }
    } else {
      metadata.class = 'fa-file-o'
    }

    return attachment
  }

  formatBytes(bytes, decimals) {
    if (!bytes || bytes === 0) {
      return ''
    }
    const k = 1000 // or 1024 for binary
    const dm = decimals + 1 || 3
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }
}
