
export interface VideoInterface {
  id: string
  stream?: any
  
  init?:() => void
}


export class VideoClass implements VideoInterface {
  id
  stream
  constructor(
    parameters: {
      id:string,
      stream?:any
    }
  ){
    this.id = parameters.id
    this.stream = parameters.stream
  }

  init() {
    console.debug('VideoClass::init', {
      id: this.id
    })
  }
}