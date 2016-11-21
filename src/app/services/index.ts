import { ConversationService, ConversationViewInterface } from './conversation'
import { MessageInterface, MessageClass, MessageService } from './message'
import { UserClass, UserInterface, UserService } from './user'
import { RtcInterface, RtcClass, RtcService } from './rtc'

export {
  ConversationService, ConversationViewInterface,
  MessageClass, MessageInterface, MessageService,
  UserClass, UserInterface, UserService,
  RtcClass, RtcInterface, RtcService,
}

export const SERVICES = [
  ConversationService, UserService, MessageService, RtcService
]
