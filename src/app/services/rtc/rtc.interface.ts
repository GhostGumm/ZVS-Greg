
import { User } from '../'

export interface RtcInterface {
  id: string
  user: User
  stream?: any
  source?: any
  focus?: boolean
  
  init?:() => void
}


export class RtcClass implements RtcInterface {
  id
  stream
  source
  focus
  user

  constructor(
    parameters: {
      id: string,
      user: User,
      stream?: any,
      source?: any,
      focus?: boolean
    }
  ){
    this.id = parameters.id
    this.user = parameters.user
    if (parameters.stream) {
      this.stream = parameters.stream
    }
    if (parameters.source) {
      this.source = parameters.source
    }
    if (parameters.focus) {
      this.focus = parameters.focus
    }
  }

  init() {
    console.debug('RtcClass::init', {
      id: this.id
    })
  }
}