import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

import { COMPONENTS } from './components'
import { VIEWS } from './views'

import { DashboardRoutingModule } from './dashboard-routing.module'

@NgModule({
  declarations: [ ...COMPONENTS, ...VIEWS ],
  imports: [ SharedModule.forRoot(), DashboardRoutingModule ],
  providers: [ ]
})
export class DashboardModule { }
