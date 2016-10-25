
export interface VideoInterface {
  id: string
  stream?: any
  focus?: boolean
  
  init?:() => void
}


export class VideoClass implements VideoInterface {
  id
  stream
  focus

  constructor(
    parameters: {
      id:string,
      stream?:any
      focus?:boolean
    }
  ){
    this.id = parameters.id
    this.stream = parameters.stream
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