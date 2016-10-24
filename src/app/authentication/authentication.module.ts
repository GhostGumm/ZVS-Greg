import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

import { COMPONENTS } from './components'
import { VIEWS } from './views'

import { AuthenticationRoutingModule } from './authentication-routing.module'

@NgModule({
  declarations: [ ...COMPONENTS, ...VIEWS ],
  imports: [ SharedModule.forRoot(), AuthenticationRoutingModule ],
  providers: [ ]
})
export class AuthenticationModule { }
