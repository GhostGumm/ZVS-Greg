import { Inject, Injectable } from '@angular/core'

import { UserInterface } from '../user'
import { MessageInterface, MessageClass } from '../message'

import { ZetaPushClient } from '../../zetapush'
import { ENVIRONMENT } from '../../app-config.module'

const REGEX_URL = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi

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

  setFile(file, isNew) {
    if (isNew === true) {
      this.files.push(file)
    } else {
      this.files.unshift(file)
    }
  }

  /**
   * messages: List of messages to index on init
   * newMessage? : Message to index once added
   * Toggle class 'precede' if messages[n].author == messages[n - 1].author & timestamp delta < 600,000ms(10min)
   * Also provide 'old' class if message.date is 1 day old or more than previous.date
   */
  indexByAuthor(messages: MessageInterface[], newMessage?: MessageInterface) {

    const checkCondition = (message: MessageInterface, previous: MessageInterface, index: number) => {
      if (message.author === previous.author && (message.date - previous.date) < 600000) {
        message.isPrecede = true
      } else {
        message.isPrecede = false
      }
      if (new Date(message.date).toLocaleDateString() !== new Date(previous.date).toLocaleDateString()) {
        message.isOld = true
      } else {
        message.isOld = false
      }
      if (index === 1) {
        messages[0].isOld = true
      }
    }

    if (messages.length > 1) {
      if (newMessage) {
        const index = messages.indexOf(newMessage)
        const previous = messages[index - 1]
        checkCondition(newMessage, previous, index)
      } else {
        for (let index = 1; index < messages.length; index++) {
          let msg = messages[index]
          let previous = messages[index - 1]
          checkCondition(msg, previous, index)
        }
      }
    } else if (messages.length === 1) {
      messages[0].isOld = true
    }
    console.debug('MessageOrder', {
      messages,
      newMessage
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

  processMarkup({ message, users, isNew }: { message: any, users: Array<UserInterface>, isNew: boolean }) {
    let markup = this.processData({ message, users })
    markup.value = this.linkify(markup.value)
    return markup
  }

  processAttachment({ message, users, isNew }: { message: any, users: Array<UserInterface>, isNew: boolean }) {
    const attachment = this.processData({ message, users })
    const { metadata } = attachment

    // Rename value & thumbnail with proxy url
    attachment.value = `${this.proxy}${attachment.value}`
    if (metadata.thumbnails && metadata.thumbnails.length >= 1) {
      attachment.metadata.thumbnails.map(thumb => thumb.url = `${this.proxy}${thumb.guid}`)
      // prefered thumbnail
      attachment.metadata.thumbnail = metadata.thumbnails[0].url
    }

    // Add files to global list
    this.setFile(attachment, isNew)

    // Format size value
    metadata.size = this.formatBytes(metadata.size, 1)

    // Default type & parsable metadata
    metadata.parsable = false
    metadata.printable = false
    metadata.type = 'file'

    // Set type & extension base on ContentType
    const contentType = metadata ? metadata.contentType : null
    metadata.extension = contentType.split('/')[1]

    if (contentType) {
      if (contentType.match(/image/g)) {
        metadata.type = 'image'
        if (contentType.match(/gif|png|jpeg/g)) {
          metadata.parsable = true
          metadata.printable = true
        }
        // Critic exception
        if (contentType.match(/adobe/g)) {
          metadata.type = 'file'
        }
      } else {
        // VIDEO
        if (contentType.match(/video/g)) {
          metadata.subtype = 'video'
          if (contentType.match(/mp4|mp3|ogg|webm/g)) {
            metadata.parsable = true
          }
        // AUDIO
        } else if (contentType.match(/audio/g)) {
          metadata.subtype = 'audio'
          if (contentType.match(/mp4|mpeg|ogg|webm|wav/g)) {
            metadata.parsable = true
          }
        } else if (contentType.match(/pdf/g)) {
          metadata.subtype = 'pdf'
          metadata.parsable = true
          // metadata.printable = true
        }
        // else if (contentType.match(/msword/g)) {
        //   metadata.extension = 'word'
        // } else if (contentType.match(/excel/g)) {
        //   metadata.extension = 'excel'
        // } else if (contentType.match(/zip|compressed|bzip/g)) {
        //   metadata.extension = 'zip'
        // } else if (contentType.match(/powerpoint/g)) {
        //   metadata.extension = 'powerpoint'
        // } else if (contentType.match(/byte/g)) {
        //   metadata.extension = 'code'
        // }
      }
    } else {
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
      const name = url
      try {
        new URL(url)
      }catch (e) {
        url = `http://${url}`
      }
      return `<a target="_blank" href="${url}">${name}</a>`
    })
  }
}
