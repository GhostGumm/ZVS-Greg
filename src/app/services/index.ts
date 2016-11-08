import { ApiUserService } from './api/user/user.service'
import { User } from './api/user/user.interface'

import { RtcService } from './rtc/rtc.service'
import { RtcClass, RtcInterface } from './rtc/rtc.interface'

export { 
  User, ApiUserService,
  RtcClass, RtcInterface, RtcService
}

export const SERVICES = [
  ApiUserService, RtcService
]
