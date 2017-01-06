import { NgZone } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/publish'

const toPascalCase = (word = '') => `${word.charAt(0).toUpperCase()}${word.substring(1)}`

export const getExtensionsAndListener = (Class: any, zone: NgZone) => {
  const filter = (element) => element !== 'constructor'
  const methods = Object.getOwnPropertyNames(Class.prototype).filter(filter)
  const extensions = {}
  const listener = methods.reduce((reducer, method) => {
    const source = Observable.create((observer) => {
      reducer[method] = ({ data = {} }) => {
        console.debug(`ZetaPushDebug::on${toPascalCase(method)}`, data)
        zone.run(() => {
          observer.next(data)
        })
      }
    })
    const published = source.publish()
    extensions[`on${toPascalCase(method)}`] = published
    published.connect()
    return reducer
  }, {})
  return { extensions , listener }
}
