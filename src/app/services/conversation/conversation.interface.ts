import { MessageInterface } from '../message'
import { UserInterface } from '../user'

export interface ConversationInterface {
  details: any
  group: any
  messages: Array<any>
  unread
}

export interface ConversationViewInterface {
  id: string
  owner: string
  users: Array<UserInterface>
  messages: Array<MessageInterface>
}
