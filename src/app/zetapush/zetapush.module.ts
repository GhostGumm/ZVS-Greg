import { NgModule } from '@angular/core'
// Application Modules
import { API_PROVIDERS } from './api'
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
    ...CORE_PROVIDERS
  ],
  bootstrap: [ ]
})
export class ZetaPushModule { }
