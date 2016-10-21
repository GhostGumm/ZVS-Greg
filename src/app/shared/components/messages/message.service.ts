import { Injectable } from '@angular/core'
import { MessageInterface, MessageClass } from './message.interface'

@Injectable()
export class MessageService {

  /**
   *  Toggle class 'precede' if messages[n].author == messages[n - 1].author
   */
  indexByAuthor(Messages:MessageInterface[], Message?:MessageInterface) {
    if (Message) {
      const index = Messages.indexOf(Message)
      const previous = Messages[index - 1]
      if (Message.author === previous.author) {
        Message.precede = true
      }
    }
    else {
      for (let index = 1; index < Messages.length; index++) {
        let message = Messages[index]
        let previous = Messages[index - 1]
        
        if (message.author === previous.author) {
          message.precede = true
        }
      }
    }
        
    console.debug('MessageOrder',{
      Messages,
      Message
    })
  }
}
