
import { UserInterface } from '../'

export interface RtcInterface {
  id: string
  user: UserInterface
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

  constructor(parameters: RtcInterface) {
    Object.assign(this, parameters)
  }

  init() {
    console.debug('RtcClass::init', {
      id: this.id
    })
  }
}