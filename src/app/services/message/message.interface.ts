import * as moment from 'moment'

import { UserInterface } from '../user'

export interface MessageInterface {
  id: string
  type: string
  author: string
  raw: string
  value: any
  date: number

  user?: UserInterface
  metadata?: any
  timeFromNow?: string

  isOwner?: boolean
  isPrecede?: boolean
  isHovered?: boolean
}

/*
const isToday = (date) => {
    return date.isSame(moment(Date.now()).startOf('day'), 'd');
}
const isYesterday = (date) => {
    return date.isSame(moment(Date.now()).subtract(7, 'days').startOf('day'), 'd');
}
const isWithinAWeek = (date) => {
    return date.isAfter(moment(Date.now()).subtract(7, 'days').startOf('day'));
}
const isTwoWeeksOrMore = (date) => {
    return !isWithinAWeek(date);
}
*/

export class MessageClass implements MessageInterface {

  static TYPE_ATTACHMENT: string = 'attachment'
  static TYPE_MARKUP: string = 'markup'

  id
  type
  author
  raw
  value
  date

  metadata
  timeFromNow

  isOwner = false
  isPrecede = false
  isHovered = false

  constructor(parameters: MessageInterface) {
    Object.assign(this, parameters)
    if (this.metadata === undefined) {
      this.metadata = {}
    }
  }

  getTimeFromNow() {
    this.timeFromNow = moment(this.date).fromNow()
  }
}
