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
  indexByAuthor(Messages: MessageInterface[], Message?: MessageInterface) {
    if (Messages.length > 1) {
      if (Message) {
        const index = Messages.indexOf(Message)
        const previous = Messages[index - 1]
        if (Message.author === previous.author) {
          Message.isPrecede = true
        }
      } else {
        for (let index = 1; index < Messages.length; index++) {
          let message = Messages[index]
          let previous = Messages[index - 1]

          if (message.author === previous.author) {
            message.isPrecede = true
          }
        }
      }
    }
    console.debug('MessageOrder', {
      Messages,
      Message
    })
  }

  processData({ message, users }: { message: any, users: Array<UserInterface> }) {
    let { author, type, value, raw, date } = message.data
    const id = message.guid

    return new MessageClass({
      id,
      author,
      type,
      value,
      raw,
      date,
      isOwner: author === this.userKey ? true : false,
      user: users.find(u => u.id === author)
    })
  }

  processMarkup({ message, users }: { message: any, users: Array<UserInterface> }) {
    let markup = this.processData({ message, users })
    return markup
  }

  processAttachment({ message, users }: { message: any, users: Array<UserInterface> }) {
    let attachment = this.processData({ message, users })
    attachment.value = `${this.proxy}${attachment.value}`
    this.setFile(attachment)
    return attachment

    // const { metadata:{ contentType } } = message
    // console.debug('MessageService::processAttachment', {
    //   message,
    //   file,
    //   contentType
    // })

    // /**
    //  * Add font-awesome icon based on contentType
    //  */
    // if (contentType) {
    //   if (contentType.match(/pdf/g)) {
    //     message.metadata.class='fa-file-pdf-o'
    //     message.metadata.type = 'pdf'
    //   }
    //   else if (contentType.match(/msword/g)) {
    //     message.metadata.class='fa-file-word-o'
    //     message.metadata.type = 'word'
    //   }
    //   else if (contentType.match(/excel/g)) {
    //     message.metadata.class='fa-file-excel-o'
    //     message.metadata.type = 'excel'
    //   }
    //   else if (contentType.match(/zip|compressed|bzip/g)) {
    //     message.metadata.class='fa-file-zip-o'
    //     message.metadata.type = 'zip'
    //   }
    //   else if (contentType.match(/powerpoint/g)) {
    //     message.metadata.class='fa-file-powerpoint-o'
    //     message.metadata.type = 'powerpoint'
    //   }
    //   else if (contentType.match(/video/g)) {
    //     message.metadata.class='fa-file-video-o'
    //     message.metadata.type = 'video'
    //   }
    //   else if (contentType.match(/byte/g)) {
    //     message.metadata.class='fa-file-code-o'
    //     message.metadata.type = 'code'
    //   }
    //   else if (contentType.match(/audio/g)) {
    //     message.metadata.class='fa-file-audio-o'
    //     message.metadata.type = 'audio'
    //   }
    //   else {
    //     message.metadata.class='fa-file-o'
    //   }
    // }
    // else {
    //   message.metadata.class='fa-file-o'
    // }
    // // Mock purpose
    //   message.type = 'image'
    //   message.value = `assets/img/test/${name}`
    // //
    // return message
  }
}
