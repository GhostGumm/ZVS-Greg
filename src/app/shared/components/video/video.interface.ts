
import { User } from '../../../services/'

export interface VideoInterface {
  id: string
  stream?: any
  focus?: boolean
  user: User
  
  init?:() => void
}


export class VideoClass implements VideoInterface {
  id
  stream
  focus
  user

  constructor(
    parameters: {
      id: string,
      stream?: any
      focus?: boolean
      user: User
    }
  ){
    this.id = parameters.id
    this.stream = parameters.stream
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