
export interface MessageInterface {
  id: string
  type: string
  author: string
  metadata: {}
  raw: string
  value: {}
  date: number
  owner?: boolean
  precede?: boolean
}


export class MessageClass implements MessageInterface {
  id
  author
  metadata
  type
  value
  raw
  date
  owner= false
  precede= false

  constructor(
    parameters: {
      id:string
      author:string
      metadata:any
      type:string
      value:any
      raw:string
      date:number
      owner?:boolean
      precede?:boolean
    }
  ) {
      this.id = parameters.id
      this.author = parameters.author
      this.metadata = parameters.metadata
      this.type = parameters.type
      this.value = parameters.value
      this.raw = parameters.raw
      this.date = parameters.date
      if (parameters.owner) {
        this.owner = parameters.owner
      }
      if (parameters.precede) {
        this.precede = parameters.precede
      }
  }
}

/**
 * Messages:MessageInterface[]
 * Message?:MessageInterface
 * if Message set
 *    Compare Message.author to previous message.author
 * else
 *    Check if message[n].author == message[n - 1].author an set message[n].precede at true 
 */
export const MessageOrder = (Messages, Message?) => {
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
      console.warn(index)
    }
  }
      
  console.debug('MessageOrder',{
    Messages,
    Message
  })
}