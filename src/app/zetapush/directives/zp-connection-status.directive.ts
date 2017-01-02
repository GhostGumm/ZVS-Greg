import { Directive, ElementRef, Input } from '@angular/core';
import { ZetaPushClient } from '../core'

@Directive({
  selector: '[zp-connection-status]'
})
export class ZpConnectionStatusDirective {
  constructor(private client: ZetaPushClient, private el: ElementRef) {
    console.log('ZpConnectionStatusDirective::constructor', client)

    const classList = []
    // Shorthand method to update class list
    const addClass = (className) => () => {
      classList.forEach((classItem) => {
        el.nativeElement.classList.remove(classItem)
      })
      el.nativeElement.classList.add(className)
      classList.push(className)
    }
    // Add connection status listener
    client.addConnectionStatusListener({
      onConnectionBroken: addClass('connection-broken'),
      onConnectionClosed: addClass('connection-closed'),
      onConnectionEstablished: addClass('connection-established'),
      onConnectionWillClose: addClass('connection-will-close'),
      onSuccessfulHandshake: addClass('successful-handshake'),
      onConnectionToServerFail: addClass('connection-to-server-fail'),
      onFailedHandshake: addClass('failed-handshake'),
      onNoServerUrlAvailable: addClass('no-server-url-available')
    })
  }
}
