import { NgZone } from '@angular/core'
import { Service } from 'zetapush-js'

import { client } from '../core'
import { getExtensionsAndListener } from '../utils'

import { MessagingService } from './messaging'

const factory = (Service: Service, zone: NgZone) => {
  const { extensions , listener } = getExtensionsAndListener(Service, zone)
  const service = client.createService({
    Type: Service,
    listener
  })
  return Object.assign(service, extensions)
}

const provider = (provide) => ({ provide, useFactory: (zone: NgZone) => factory(provide, zone), deps: [NgZone] })

export { MessagingService }

export const PROVIDERS = [MessagingService].map(provider)
