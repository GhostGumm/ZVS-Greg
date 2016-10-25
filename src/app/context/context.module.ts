import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

import { COMPONENTS } from './components'
import { VIEWS } from './views'

import { ContextRoutingModule } from './context-routing.module'

@NgModule({
  declarations: [ ...COMPONENTS, ...VIEWS ],
  imports: [ SharedModule.forRoot(), ContextRoutingModule ],
  providers: [ ]
})
export class ContextModule { }
