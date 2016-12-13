import './polyfills.ts'
import 'hammerjs'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { environment } from './environments/environment'
import { AppModule, initialize } from './app/'

if (environment.production) {
  enableProdMode()
}

// Converser cette portion de code static pour le build AOT
// platformBrowserDynamic().bootstrapModule(AppModule).then(() => initialize)
initialize.then(() => platformBrowserDynamic().bootstrapModule(AppModule, []))

window.WebFont.load({
  google: {
    families: ['Material Icons']
  }
})
