import { Inject, Injectable } from '@angular/core'

import { UserInterface } from '../user'
import { MessageInterface, MessageClass } from '../message'

import { ZetaPushClient } from '../../zetapush'
import { ENVIRONMENT } from '../../app-config.module'

const REGEX_URL = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

@Injectable()
export class MessageService {
  public files: Array<MessageInterface> = []
  private userKey = this.zpClient.getUserId()
  private proxy: string

  constructor(
    @Inject(ENVIRONMENT) private environment,
    private zpClient: ZetaPushClient
  ) {
    this.proxy = environment.ZETAPUSH_PROXY_URL
  }

  resetServices() {
    this.files = []
  }

  getFiles() {
    console.debug('MessageService::getFiles', this.files)
    return this.files
  }

  setFile(file) {
    console.debug('MessageService::setFile', file)
    this.files.push(file)
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
    markup.value = this.linkify(markup.value)
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
        metadata.type = 'image'
        if (contentType.match(/gif/g)) {
          metadata.extension = 'gif'
        } else if (contentType.match(/jpeg/g)) {
          metadata.extension = 'jpeg'
        } else if (contentType.match(/png/g)) {
          metadata.extension = 'png'
        }
      } else {
        metadata.type = 'file'
        if (contentType.match(/pdf/g)) {
          metadata.extension = 'pdf'
        } else if (contentType.match(/msword/g)) {
          metadata.extension = 'word'
        } else if (contentType.match(/excel/g)) {
          metadata.extension = 'excel'
        } else if (contentType.match(/zip|compressed|bzip/g)) {
          metadata.extension = 'zip'
        } else if (contentType.match(/powerpoint/g)) {
          metadata.extension = 'powerpoint'
        } else if (contentType.match(/video/g)) {
          metadata.extension = 'video'
        } else if (contentType.match(/byte/g)) {
          metadata.extension = 'code'
        } else if (contentType.match(/audio/g)) {
          metadata.extension = 'audio'
        }
      }
    } else {
      metadata.type = 'file'
      metadata.contentType = 'unknown'
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

  linkify(text) {
    return text.replace(REGEX_URL, (url) => {
      return `<a target="_blank" href="${url}">${url}</a>`
    })
  }
}
