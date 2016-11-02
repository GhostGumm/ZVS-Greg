
export interface MessageInterface {
  id: string
  type: string
  author: string
  metadata: any
  raw: string
  value: any
  date: number
  owner?: boolean
  precede?: boolean
  isHovered?: boolean
}


export class MessageClass implements MessageInterface {
  id
  author
  metadata
  type
  value
  raw
  date
  owner= false
  precede= false
  isHovered= false

  constructor(
    parameters: {
      id:string
      author:string
      metadata:any
      type:string
      value?:any
      raw:string
      date:number
      owner?:boolean
      precede?:boolean
      isHovered?:boolean
    }
  ) {
      this.id = parameters.id
      this.author = parameters.author
      this.metadata = parameters.metadata
      this.type = parameters.type
      this.raw = parameters.raw
      this.date = parameters.date

      if (parameters.value) {
        this.value = parameters.value
      }
      if (parameters.owner) {
        this.owner = parameters.owner
      }
      if (parameters.precede) {
        this.precede = parameters.precede
      }
      if (parameters.isHovered) {
        this.isHovered = parameters.isHovered
      }
  }
}