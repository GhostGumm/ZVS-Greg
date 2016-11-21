import { UserInterface } from '../user'

export interface MessageInterface {
  id: string
  type: string
  author: string
  raw: string
  value: any
  date: number

  user?: UserInterface
  metadata?: any
  dateFromNow?: string

  isOwner?: boolean
  isPrecede?: boolean
  isHovered?: boolean
}


export class MessageClass implements MessageInterface {
  id
  type
  author
  raw
  value
  date

  metadata= {}

  isOwner= false
  isPrecede= false
  isHovered= false

  constructor(parameters: MessageInterface) {
    Object.assign(this, parameters)
  }
}
