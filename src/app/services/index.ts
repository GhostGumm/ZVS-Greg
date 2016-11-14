import { UserService } from './api/user/user.service'
import { UserInterface, UserClass } from './api/user/user.interface'

import { MessageService } from './api/messages/message.service'
import { MessageInterface, MessageClass } from './api/messages/message.interface'

import { RtcService } from './rtc/rtc.service'
import { RtcClass, RtcInterface } from './rtc/rtc.interface'

export { 
  UserInterface, UserClass, UserService,
  MessageInterface, MessageClass, MessageService,
  RtcClass, RtcInterface, RtcService,
}

export const SERVICES = [
  UserService, MessageService, RtcService
]
