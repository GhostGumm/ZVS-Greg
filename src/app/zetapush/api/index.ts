import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/publish'

import { client } from '../core'
import { Api } from './api'
import { ApiConfig } from './api-config'

const toPascalCase = (word = '') => `${word.charAt(0).toUpperCase()}${word.substring(1)}`

export const apiFactory = (Api: Api) => {
  const filter = (element) => element !== 'constructor'
  const methods = Object.getOwnPropertyNames(Api.prototype).filter(filter)
  const extensions = {}
  const listener = methods.reduce((reducer, method) => {
    const source = Observable.create((observer) => {
      reducer[method] = ({ data = {} }) => {
        console.debug(`Api::on${toPascalCase(method)}`, data)
        observer.next(data)
      }
    })
    const published = source.publish()
    extensions[`on${toPascalCase(method)}`] = published
    published.connect()
    return reducer
  }, {})
  const service = client.createService({
    Type: Api,
    listener
  })
  return Object.assign(service, extensions)
}
export { ApiConfig }

export const API_PROVIDERS = [
  { provide: ApiConfig, useFactory: () => apiFactory(ApiConfig)}
]
