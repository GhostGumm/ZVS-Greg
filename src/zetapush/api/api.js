import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/publish'

import { services } from 'zetapush-js'
import { client } from '../client'

const toPascalCase = (word = '') => {
  return `${word.charAt(0).toUpperCase()}${word.substring(1)}`
}

const factory = ($rootScope, type) => {
  const filter = (element) => element !== 'constructor'
  const methods = ['error', ...Object.getOwnPropertyNames(type.prototype).filter(filter)]
  const extensions = {}
  const listener = methods.reduce((reducer, method) => {
    const source = Observable.create((observer) => {
      let active = true

      reducer[method] = ({ data = {} }) => {
        //console.debug(`Api::on${toPascalCase(method)}`, data)
        observer.next(data)
        $rootScope.$digest()
      }
    })
    const published = source.publish()
    extensions[`on${toPascalCase(method)}`] = published
    published.connect()
    return reducer
  }, {})

  const service = client.createService({
    type,
    listener
  })
  return Object.assign(service, extensions)
}

export class Api extends services.Macro {
  static ngFactory() {
    return ['$rootScope', ($rootScope) => factory($rootScope, this.prototype.constructor)]
  }
}
