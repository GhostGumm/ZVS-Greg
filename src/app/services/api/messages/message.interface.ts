import { UserInterface } from './../../../services';

export interface MessageInterface {
  id: string
  type: string
  author: string
  raw: string

  user? : UserInterface
  metadata?: any
  value?: any
  date?: number
  
  isOwner?: boolean
  isPrecede?: boolean
  isHovered?: boolean
}


export class MessageClass implements MessageInterface {
  id
  type
  author
  raw

  user
  metadata
  value
  date

  isOwner= false
  isPrecede= false
  isHovered= false

  constructor(parameters: MessageInterface) {
    Object.assign(this, parameters)
  }
}