import './polyfills.ts'
import 'hammerjs'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { environment } from './environments/environment'
import { initialize, AppModule } from './app/'

if (environment.production) {
  enableProdMode()
}

//initialize.then(() => {
  document.addEventListener('DOMContentLoaded', function () {
    platformBrowserDynamic().bootstrapModule(AppModule, [])
  })
//})

window.WebFont.load({
  google: {
    families: ['Noto Sans', 'Material Icons']
  }
})
