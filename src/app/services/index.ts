import { ApiUserService } from './api/user/user.service'
import { UserInterface, UserClass } from './api/user/user.interface'

import { RtcService } from './rtc/rtc.service'
import { RtcClass, RtcInterface } from './rtc/rtc.interface'

export { 
  UserInterface, UserClass, ApiUserService,
  RtcClass, RtcInterface, RtcService
}

export const SERVICES = [
  ApiUserService, RtcService
]
