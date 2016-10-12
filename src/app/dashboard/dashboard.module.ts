import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

import { ChartistComponent } from 'angular2-chartist'

import { COMPONENTS } from './components'
import { VIEWS } from './views'

import { DashboardRoutingModule } from './dashboard-routing.module'

@NgModule({
  declarations: [ ...COMPONENTS, ...VIEWS, ChartistComponent ],
  imports: [ SharedModule, DashboardRoutingModule ],
  providers: [ ]
})
export class DashboardModule { }
