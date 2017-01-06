import { NgModule } from '@angular/core'
// Application Modules
import { PROVIDERS as API_PROVIDERS  } from './api'
import { PROVIDERS as SERVICE_PROVIDERS } from './services'
import { CORE_PROVIDERS } from './core'

import { DIRECTIVES } from './directives'

@NgModule({
  declarations: [
    ...DIRECTIVES
  ],
  exports: [
    ...DIRECTIVES
  ],
  imports: [ ],
  providers: [
    ...API_PROVIDERS,
    ...CORE_PROVIDERS,
    ...SERVICE_PROVIDERS
  ],
  bootstrap: [ ]
})
export class ZetaPushModule { }
