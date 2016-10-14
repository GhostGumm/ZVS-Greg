import { NgModule } from '@angular/core'
// Application Modules
import { API_PROVIDERS } from './api'

@NgModule({
  declarations: [ ],
  imports: [ ],
  providers: [
    ...API_PROVIDERS
  ],
  bootstrap: [ ]
})
export class ZetaPushModule { }
