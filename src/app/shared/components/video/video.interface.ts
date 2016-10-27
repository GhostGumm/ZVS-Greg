
import { User } from '../../../services/'

export interface VideoInterface {
  id: string
  stream?: any
  source?: any
  focus?: boolean
  user: User
  
  init?:() => void
}


export class VideoClass implements VideoInterface {
  id
  stream
  source
  focus
  user

  constructor(
    parameters: {
      id: string,
      stream?: any
      source?: any
      focus?: boolean
      user: User
    }
  ){
    this.id = parameters.id
    this.stream = parameters.stream
    this.source = parameters.source
    this.user = parameters.user
    if (parameters.focus) {
      this.focus = parameters.focus
    }
  }

  init() {
    console.debug('VideoClass::init', {
      id: this.id
    })
  }
}